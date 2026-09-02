# 나준혁 · Data Engineer Portfolio

GitHub를 단일 원본으로 사용하며, 경력 데이터를 한 번만 수정하면 웹 포트폴리오와 A4 이력서에 함께 반영되는 개인 포트폴리오 프로젝트입니다.

배포 주소: <https://junhyeok94-la.github.io/>

## 구조

```text
content/                 공개 경력 원본(YAML)
  profile.yaml           소개, 경력, 기술
  projects.yaml          프로젝트와 문제·실행·성과
  credentials.yaml       학력, 자격, 교육, 어학
  pop-talk.yaml          수상 AI PBL 프로젝트 상세 설명
app/
  page.tsx               웹 포트폴리오
  resume/page.tsx        A4 이력서 템플릿
  projects/pop-talk/     Pop Talk 프로젝트 상세 페이지
scripts/
  generate-pdf.mjs       Chrome 기반 PDF 생성
output/pdf/              생성된 최종 PDF
```

## 실행

Node.js 22.13 이상이 필요합니다.

```bash
npm install
npm run dev
```

브라우저에서 다음 주소를 확인합니다.

- 포트폴리오: `http://localhost:3000`
- 프로젝트 상세: `http://localhost:3000/projects/pop-talk`
- 이력서 미리보기: `http://localhost:3000/resume`

## GitHub 기반 관리 흐름

`main` 브랜치가 포트폴리오의 단일 원본입니다.

1. `content/`의 YAML을 수정합니다.
2. 로컬에서 `npm run lint`, `npm run build`, `npm run pdfs:generate -- --start`로 확인합니다.
3. 변경사항을 `main`에 푸시합니다.
4. GitHub Actions가 PDF와 정적 사이트를 다시 만들고 GitHub Pages에 배포합니다.

별도 서버, 데이터베이스 또는 유료 배포 서비스가 필요하지 않습니다. GitHub Free에서는 공개 저장소의 GitHub Pages를 무료로 사용할 수 있습니다.

## 경력 수정

일반적인 내용 수정은 `content/` 아래 YAML 파일만 편집합니다.

1. `profile.yaml`에서 소개, 이메일, 기술, 회사 경력을 수정합니다.
2. `projects.yaml`에서 프로젝트 기간과 문제·실행·성과를 수정합니다.
3. `credentials.yaml`에서 학력, 자격증, 교육, 어학을 수정합니다.
4. `pop-talk.yaml`에서 AI PBL 프로젝트의 문제, 데이터 흐름과 Agent 구조를 수정합니다.
5. `npm run dev`로 웹과 이력서 화면을 확인합니다.
6. PDF를 다시 생성합니다.

공개 저장소에는 전화번호, 자격증 번호, 인증 ID 같은 개인정보를 추가하지 않습니다.

프로젝트 기획서 원본에는 팀원 이메일 등 제3자의 개인정보가 포함되어 있으므로 저장소에 게시하지 않습니다. 공개 포트폴리오에는 `content/pop-talk.yaml`의 비식별화된 요약만 사용합니다.

## PDF 생성

개발 서버를 실행한 상태에서:

```bash
npm run resume:pdf
```

서버 실행까지 자동화하려면:

```bash
npm run resume:pdf -- --start
```

결과는 `output/pdf/na-junhyeok-data-engineer-resume-ko.pdf`에 생성되며 웹 다운로드용 `public/resume.pdf`에도 복사됩니다. Chrome 또는 Chromium이 필요하며, 자동 탐지가 안 되면 `CHROME_PATH`를 지정합니다.

제출용 포트폴리오 PDF는 개발 서버 실행 중 `npm run portfolio:pdf`로 생성할 수 있습니다. 서버까지 함께 시작하려면 아래 명령을 사용합니다.

```bash
npm run portfolio:pdf -- --start
```

이력서와 포트폴리오를 한 번에 생성하려면 `npm run pdfs:generate -- --start`를 사용합니다. 포트폴리오 결과는 `output/pdf/na-junhyeok-data-engineer-portfolio-ko.pdf`와 웹 다운로드용 `public/portfolio.pdf`에 생성됩니다.

## 자동 배포

`.github/workflows/deploy-pages.yml`이 코드 검사, 최신 PDF 생성, Next.js 정적 빌드와 GitHub Pages 배포를 수행합니다.

## 검증

```bash
npm run lint
npm run build
```

PDF 내용을 변경한 뒤에는 생성된 3개 페이지를 이미지로 렌더링해 잘림, 겹침, 빈 페이지가 없는지 확인합니다.

## 콘텐츠 원칙

- 실무 프로젝트를 먼저 보여주고 교육·팀 프로젝트는 별도 맥락으로 구분합니다.
- 이력서는 3페이지 안에서 핵심 성과 위주로 요약합니다.
- 상세한 문제 해결 과정은 웹 포트폴리오에 남깁니다.
- 프로젝트는 최신순으로 관리합니다.
- 가능한 경우 문제 → 실행 → 성과 순서와 정량적인 근거를 사용합니다.
- 외부 공개가 어려운 고객 데이터, 내부 구조, 수치는 비식별화합니다.
