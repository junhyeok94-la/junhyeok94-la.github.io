import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { basename, join, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { get as httpGet } from 'node:http';
import { get as httpsGet } from 'node:https';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PDFDocument } from 'pdf-lib';

const shouldStartServer = process.argv.includes('--start');
const requestedDocument =
  process.argv.find((argument) =>
    ['resume', 'portfolio', 'all'].includes(argument),
  ) ?? 'resume';
const projectRoot = process.cwd();
const outputDir = resolve(projectRoot, 'output', 'pdf');

const documentConfigs = {
  resume: {
    label: '이력서',
    siteUrl: process.env.RESUME_URL ?? 'http://127.0.0.1:3001/',
    outputPath: resolve(outputDir, 'na-junhyeok-data-engineer-resume-ko.pdf'),
    publicPath: resolve(
      projectRoot,
      'documents',
      'resume',
      'public',
      'resume.pdf',
    ),
    serverDirectory: 'documents/resume',
    serverPort: '3001',
    expectedPages: 4,
    allowTrailingBlankPage: true,
  },
  portfolio: {
    label: '포트폴리오',
    siteUrl:
      process.env.PORTFOLIO_PDF_URL ??
      pathToFileURL(
        resolve(projectRoot, 'documents', 'portfolio-archive', 'index.html'),
      ).href,
    outputPath: resolve(
      outputDir,
      'na-junhyeok-data-engineer-portfolio-ko.pdf',
    ),
    publicPath: resolve(
      projectRoot,
      'documents',
      'portfolio-archive',
      'portfolio.pdf',
    ),
    serverDirectory: '.',
    serverPort: '3000',
    expectedPages: 12,
  },
};

const documents =
  requestedDocument === 'all'
    ? Object.values(documentConfigs)
    : [documentConfigs[requestedDocument]];

const browserCandidates =
  process.platform === 'win32'
    ? [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      ]
    : [
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
      ];

const browser =
  process.env.CHROME_PATH ??
  browserCandidates.find((candidate) => existsSync(candidate));
if (!browser)
  throw new Error(
    'Chrome 또는 Chromium 실행 파일을 찾을 수 없습니다. CHROME_PATH를 지정해 주세요.',
  );

const servers = [];
let browserProfile;

function pageResponds(url) {
  if (url.startsWith('file:'))
    return Promise.resolve(existsSync(fileURLToPath(url)));
  return new Promise((resolveCheck) => {
    const get = url.startsWith('https:') ? httpsGet : httpGet;
    const request = get(url, (response) => {
      response.resume();
      resolveCheck(response.statusCode >= 200 && response.statusCode < 400);
    });
    request.setTimeout(2000, () => request.destroy());
    request.on('error', () => resolveCheck(false));
  });
}

async function waitForPage(url, timeoutMs = 45_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await pageResponds(url)) return;
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 500));
  }
  throw new Error(`PDF 원본 페이지가 준비되지 않았습니다: ${url}`);
}

function run(command, args, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      windowsHide: true,
      ...options,
    });
    child.on('error', rejectRun);
    child.on('exit', (code) =>
      code === 0
        ? resolveRun()
        : rejectRun(new Error(`${command} exited with ${code}`)),
    );
  });
}

async function generatePdf(config) {
  await waitForPage(config.siteUrl);
  const draftPath = resolve(
    outputDir,
    `.${basename(config.outputPath)}.${process.pid}.draft.pdf`,
  );
  browserProfile = await mkdtemp(join(tmpdir(), `njh-${requestedDocument}-`));
  await run(
    browser,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-extensions',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${browserProfile}`,
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=5000',
      `--print-to-pdf=${draftPath}`,
      config.siteUrl,
    ],
    { stdio: 'ignore' },
  );

  if (!existsSync(draftPath)) {
    throw new Error(
      `브라우저가 ${config.label} PDF 파일을 생성하지 못했습니다: ${config.outputPath}`,
    );
  }

  // Headless Chromium on Windows can append one empty sheet after fixed A4 sections.
  const pdfDocument = await PDFDocument.load(await readFile(draftPath));
  if (
    config.allowTrailingBlankPage &&
    pdfDocument.getPageCount() === config.expectedPages + 1
  ) {
    pdfDocument.removePage(config.expectedPages);
    await writeFile(draftPath, await pdfDocument.save());
  } else if (pdfDocument.getPageCount() !== config.expectedPages) {
    throw new Error(
      `${config.label} 예상 페이지 수 ${config.expectedPages}와 다릅니다: ${pdfDocument.getPageCount()}`,
    );
  }

  const pdf = await stat(draftPath);
  if (pdf.size < 10_000)
    throw new Error(
      `생성된 ${config.label} PDF 크기가 비정상적으로 작습니다: ${pdf.size} bytes`,
    );
  await copyFile(draftPath, config.outputPath);
  await mkdir(resolve(config.publicPath, '..'), { recursive: true });
  await copyFile(config.outputPath, config.publicPath);
  await rm(draftPath, { force: true });
  console.log(`Created ${config.outputPath} (${pdf.size} bytes)`);
  console.log(`Copied ${config.publicPath}`);

  await clearBrowserProfile();
  browserProfile = undefined;
}

async function clearBrowserProfile() {
  if (!browserProfile) return;
  const target = resolve(browserProfile);
  if (
    !target.startsWith(resolve(tmpdir()) + sep) ||
    !basename(target).startsWith('njh-')
  ) {
    throw new Error('브라우저 임시 폴더 경로가 예상 범위를 벗어났습니다.');
  }
  // Windows Chrome helpers can retain profile locks after printing. Keep the
  // disposable OS-temp profile rather than block a completed document export.
  if (process.platform === 'win32') return;
  await rm(target, { recursive: true, force: true });
}

try {
  await mkdir(outputDir, { recursive: true });
  for (const document of documents) {
    if (shouldStartServer && !(await pageResponds(document.siteUrl))) {
      const server = spawn(
        process.execPath,
        [
          resolve(projectRoot, 'node_modules/next/dist/bin/next'),
          'dev',
          document.serverDirectory,
          '--webpack',
          '--hostname',
          '127.0.0.1',
          '--port',
          document.serverPort,
        ],
        {
          cwd: projectRoot,
          stdio: ['ignore', 'pipe', 'pipe'],
          windowsHide: true,
        },
      );
      server.stdout.pipe(process.stdout, { end: false });
      server.stderr.pipe(process.stderr, { end: false });
      servers.push(server);
    }
    await generatePdf(document);
  }
} finally {
  for (const server of servers) {
    if (!server.pid || server.killed) continue;
    server.stdout.unpipe(process.stdout);
    server.stderr.unpipe(process.stderr);
    server.stdout.destroy();
    server.stderr.destroy();
    if (process.platform === 'win32') {
      await new Promise((done) => {
        const stopper = spawn(
          'taskkill',
          ['/PID', String(server.pid), '/T', '/F'],
          { stdio: 'ignore', windowsHide: true },
        );
        const timeout = setTimeout(() => {
          server.kill();
          stopper.kill();
          done();
        }, 3000);
        const finish = () => {
          clearTimeout(timeout);
          done();
        };
        stopper.on('exit', finish);
        stopper.on('error', finish);
      });
    } else server.kill();
    server.unref();
  }
  await clearBrowserProfile();
}
