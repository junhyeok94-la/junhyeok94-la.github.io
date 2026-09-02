import { copyFile, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { PDFDocument } from 'pdf-lib';

const shouldStartServer = process.argv.includes('--start');
const requestedDocument = process.argv.find((argument) => ['resume', 'portfolio', 'all'].includes(argument)) ?? 'resume';
const projectRoot = process.cwd();
const outputDir = resolve(projectRoot, 'output', 'pdf');

const documentConfigs = {
  resume: {
    label: '이력서',
    siteUrl: process.env.RESUME_URL ?? 'http://127.0.0.1:3000/resume',
    outputPath: resolve(outputDir, 'na-junhyeok-data-engineer-resume-ko.pdf'),
    publicPath: resolve(projectRoot, 'public', 'resume.pdf'),
    expectedPages: 3,
  },
  portfolio: {
    label: '포트폴리오',
    siteUrl: process.env.PORTFOLIO_PDF_URL ?? 'http://127.0.0.1:3000/portfolio-pdf',
    outputPath: resolve(outputDir, 'na-junhyeok-data-engineer-portfolio-ko.pdf'),
    publicPath: resolve(projectRoot, 'public', 'portfolio.pdf'),
    expectedPages: 7,
  },
};

const documents = requestedDocument === 'all'
  ? Object.values(documentConfigs)
  : [documentConfigs[requestedDocument]];

const browserCandidates = process.platform === 'win32'
  ? [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    ]
  : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];

const browser = process.env.CHROME_PATH ?? browserCandidates.find((candidate) => existsSync(candidate));
if (!browser) throw new Error('Chrome 또는 Chromium 실행 파일을 찾을 수 없습니다. CHROME_PATH를 지정해 주세요.');

let server;
let browserProfile;

async function waitForPage(url, timeoutMs = 45_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The local preview may still be compiling.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 500));
  }
  throw new Error(`PDF 원본 페이지가 준비되지 않았습니다: ${url}`);
}

function run(command, args, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });
    child.on('error', rejectRun);
    child.on('exit', (code) => code === 0 ? resolveRun() : rejectRun(new Error(`${command} exited with ${code}`)));
  });
}

async function generatePdf(config) {
  await waitForPage(config.siteUrl);
  await rm(config.outputPath, { force: true });
  browserProfile = await mkdtemp(join(tmpdir(), `njh-${requestedDocument}-`));
  await run(browser, [
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
    `--print-to-pdf=${config.outputPath}`,
    config.siteUrl,
  ]);

  if (!existsSync(config.outputPath)) {
    throw new Error(`브라우저가 ${config.label} PDF 파일을 생성하지 못했습니다: ${config.outputPath}`);
  }

  // Headless Chromium on Windows can append one empty sheet after fixed A4 sections.
  const pdfDocument = await PDFDocument.load(await readFile(config.outputPath));
  if (pdfDocument.getPageCount() === config.expectedPages + 1) {
    pdfDocument.removePage(config.expectedPages);
    await writeFile(config.outputPath, await pdfDocument.save());
  } else if (pdfDocument.getPageCount() !== config.expectedPages) {
    throw new Error(`${config.label} 예상 페이지 수 ${config.expectedPages}와 다릅니다: ${pdfDocument.getPageCount()}`);
  }

  const pdf = await stat(config.outputPath);
  if (pdf.size < 10_000) throw new Error(`생성된 ${config.label} PDF 크기가 비정상적으로 작습니다: ${pdf.size} bytes`);
  await copyFile(config.outputPath, config.publicPath);
  console.log(`Created ${config.outputPath} (${pdf.size} bytes)`);
  console.log(`Copied ${config.publicPath}`);

  await rm(browserProfile, { recursive: true, force: true });
  browserProfile = undefined;
}

async function generateGraphSnapshot() {
  const graphSourcePath = resolve(projectRoot, 'public', 'projects', 'pop-talk', 'langgraph-flow.html');
  const graphOutputPath = resolve(projectRoot, 'public', 'projects', 'pop-talk', 'langgraph-flow-print.png');
  const graphSourceUrl = pathToFileURL(graphSourcePath);
  graphSourceUrl.searchParams.set('print', '1');
  browserProfile = await mkdtemp(join(tmpdir(), 'njh-langgraph-'));
  await run(browser, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=2500',
    '--window-size=1600,900',
    `--user-data-dir=${browserProfile}`,
    `--screenshot=${graphOutputPath}`,
    graphSourceUrl.href,
  ]);
  const snapshot = await stat(graphOutputPath);
  if (snapshot.size < 10_000) throw new Error(`LangGraph 스냅샷 크기가 비정상적으로 작습니다: ${snapshot.size} bytes`);
  console.log(`Created ${graphOutputPath} (${snapshot.size} bytes)`);
  await rm(browserProfile, { recursive: true, force: true });
  browserProfile = undefined;
}

try {
  if (shouldStartServer) {
    const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    server = spawn(npmCommand, ['run', 'dev'], { cwd: projectRoot, stdio: 'inherit', shell: process.platform === 'win32' });
  }

  await mkdir(outputDir, { recursive: true });
  if (documents.includes(documentConfigs.portfolio)) await generateGraphSnapshot();
  for (const document of documents) await generatePdf(document);
} finally {
  if (server && !server.killed) server.kill();
  if (browserProfile) await rm(browserProfile, { recursive: true, force: true });
}
