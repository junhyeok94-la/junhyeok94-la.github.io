# 나준혁 · 프로젝트 포트폴리오

공개 웹사이트는 프로젝트별 설계와 문제 해결 기록만 제공합니다. 지원용 이력서는 `documents/resume/`의 독립 작업 공간에서 관리하며 GitHub Pages 빌드·배포에 포함되지 않습니다.

공개 주소: <https://junhyeok94-la.github.io/>

## 공개 포트폴리오

- 홈: 실무 데이터 플랫폼 4건, 웹 업무 시스템 2건, Pop Talk 교육 팀 프로젝트
- 실무 상세: `/projects/{프로젝트 ID}/` — 개요, 담당 범위, 아키텍처·논리 흐름, 문제·판단·실행·결과, 회고
- Pop Talk: `/projects/pop-talk/` — 실제 구현 화면, Agent 흐름, 데이터 파이프라인, NCP 논리 구성도
- 이력서·학력·자격증·병역·증명사진·이력서 다운로드는 공개 사이트에 표시하거나 배포하지 않습니다.

```text
app/page.tsx                       프로젝트 목록
app/projects/[slug]/page.tsx        실무 프로젝트 공통 상세 템플릿
app/projects/pop-talk/page.tsx      AI 교육 팀 프로젝트 상세
components/portfolio.module.css    프로젝트 사이트 디자인
content/profile.yaml               공개 이름·연락처만 관리
content/projects.yaml              기간·역할·기술·문제·실행·성과
content/case-studies.yaml           개요·담당 범위·도식·이미지·결과·회고
content/pop-talk.yaml               Pop Talk 상세와 실제 구현 화면
public/projects/{프로젝트 ID}/      공개 이미지·SVG·시연 자료
```

### 실행·검증·배포

Node.js 22.13 이상과 루트 의존성을 사용합니다.

```powershell
npm install
npm run dev
npm run lint
npm run build
```

로컬 공개 사이트는 `http://localhost:3000`입니다. `npm run build`는 공개 웹사이트만 `out/`에 생성합니다. GitHub Actions도 이 빌드만 실행하며 `main`에 반영된 버전을 기존 GitHub Pages에 배포합니다. 이력서 PDF는 배포 과정에서 생성하지 않습니다.

### 프로젝트 추가·수정

1. `content/projects.yaml`에 ID, 명칭, 기간, 담당 역할, 기술과 문제·실행·성과를 작성합니다.
2. `content/case-studies.yaml`에 같은 ID로 개요, 담당 범위, 아키텍처, 결과, 회고를 작성합니다. 페이지는 빌드 때 자동 생성됩니다.
3. 이미지는 `public/projects/{ID}/`에 저장합니다. `architecture.image` 또는 `figures`에 이미지 경로·대체 텍스트·설명을 연결합니다.
4. 실제 화면과 재구성 도식을 설명에서 구분합니다. 개념도는 확인된 역할 관계만 표현하며 확인되지 않은 서버·API·스키마·성과 수치를 추가하지 않습니다.
5. 공개 가능한 이미지가 없는 경우 `architecture.steps`로 확인된 기술 구성만 표시합니다. 빈 이미지나 가짜 캡처는 사용하지 않습니다.

기존 검토된 도식은 `python scripts/export-portfolio-figures.py`로 보관 원본에서 추출할 수 있습니다. 상세 사실 기준은 `docs/portfolio-content-notes.md`를 참고합니다.

## 지원용 이력서 — 별도 관리

기본 이력서는 A4 4페이지 구성을 보존합니다. 웹사이트 내용과 독립된 문서용 데이터 복사본을 사용하므로 포트폴리오 편집이 제출 이력서 문구를 바꾸지 않습니다.

```text
documents/resume/
  app/page.tsx                     이력서 템플릿
  app/resume.module.css            A4 문서 레이아웃
  content/profile.yaml             재직기간·연락처·기술
  content/credentials.yaml         학력·자격·교육·어학
  content/resume.yaml              강점·병역·사진·프로젝트·외부 활동
  content/projects.yaml            제출 이력서용 프로젝트 데이터
  public/profile/                  증명사진
```

```powershell
npm run resume:dev
npm run resume:build
npm run resume:pdf -- --start
```

- 미리보기: `http://localhost:3001/`
- 최종 파일: `output/pdf/na-junhyeok-data-engineer-resume-ko.pdf`
- 문서 미리보기의 다운로드 사본: `documents/resume/public/resume.pdf`
- 문서 빌드: `documents/resume/out/` — 공개 웹사이트 `out/`과 별개

루트에서 명령을 실행하며 문서 폴더에 별도 설치는 하지 않습니다. PDF 생성에는 Chrome 또는 Edge가 필요하고 `CHROME_PATH`로 실행 파일을 지정할 수 있습니다. 실행 중인 문서 서버가 있으면 재사용합니다. PDF 검증이 통과한 후에만 기존 최종 파일을 교체합니다.

## 이전 포트폴리오 PDF 보관

검토된 12쪽 편집형 포트폴리오 원본은 `documents/portfolio-archive/`에 보존합니다. 공개 웹사이트에서는 프로젝트 상세 페이지를 사용하며, 이 보관 문서는 자동 배포하지 않습니다.

`npm run portfolio:pdf`는 보관 HTML로 PDF를 생성합니다. 보관본은 이전 제출 문서이므로 최신 프로젝트 설명과 수치를 반영하려면 별도로 검토해야 합니다.
