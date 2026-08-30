import { copyFile, mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { PDFDocument } from 'pdf-lib';

const shouldStartServer = process.argv.includes('--start');
const siteUrl = process.env.RESUME_URL ?? 'http://127.0.0.1:3000/resume';
const projectRoot = process.cwd();
const outputDir = resolve(projectRoot, 'output', 'pdf');
const outputPath = resolve(outputDir, 'na-junhyeok-data-engineer-resume-ko.pdf');
const publicPath = resolve(projectRoot, 'public', 'resume.pdf');

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
  throw new Error(`이력서 페이지가 준비되지 않았습니다: ${url}`);
}

function run(command, args, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });
    child.on('error', rejectRun);
    child.on('exit', (code) => code === 0 ? resolveRun() : rejectRun(new Error(`${command} exited with ${code}`)));
  });
}

try {
  if (shouldStartServer) {
    const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    server = spawn(npmCommand, ['run', 'dev'], { cwd: projectRoot, stdio: 'inherit', shell: process.platform === 'win32' });
  }

  await waitForPage(siteUrl);
  await mkdir(outputDir, { recursive: true });
  await rm(outputPath, { force: true });
  browserProfile = await mkdtemp(join(tmpdir(), 'njh-resume-'));
  await run(browser, [
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${browserProfile}`,
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=3000',
    `--print-to-pdf=${outputPath}`,
    siteUrl,
  ]);

  if (!existsSync(outputPath)) {
    throw new Error(`브라우저가 PDF 파일을 생성하지 못했습니다: ${outputPath}`);
  }

  // Headless Chromium on Windows can append one empty sheet after fixed A4 sections.
  // The template intentionally owns exactly three pages, so normalize that known case.
  const pdfDocument = await PDFDocument.load(await readFile(outputPath));
  const expectedPages = 3;
  if (pdfDocument.getPageCount() === expectedPages + 1) {
    pdfDocument.removePage(expectedPages);
    await writeFile(outputPath, await pdfDocument.save());
  } else if (pdfDocument.getPageCount() !== expectedPages) {
    throw new Error(`예상 페이지 수 ${expectedPages}와 다릅니다: ${pdfDocument.getPageCount()}`);
  }

  const pdf = await stat(outputPath);
  if (pdf.size < 10_000) throw new Error(`생성된 PDF 크기가 비정상적으로 작습니다: ${pdf.size} bytes`);
  await copyFile(outputPath, publicPath);
  console.log(`Created ${outputPath} (${pdf.size} bytes)`);
  console.log(`Copied ${publicPath}`);
} finally {
  if (server && !server.killed) server.kill();
  if (browserProfile) await rm(browserProfile, { recursive: true, force: true });
}
