import type { Metadata } from 'next';
import { ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { credentials, popTalk, profile, projects, type Achievement, type Project } from '@/lib/content';

const TOTAL_PAGES = 7;

const skillGroupLabelsKo: Record<string, string> = {
  'Languages & Query': '언어·쿼리',
  'Orchestration & Transformation': '오케스트레이션·변환',
  'Data Warehouse & Database': 'DW·데이터베이스',
  'Cloud & Big Data': '클라우드·빅데이터',
  'DevOps & CI/CD': '개발 운영·CI/CD',
  'Documentation & Collaboration': '문서화·협업',
  'AI & Agent': 'AI·에이전트',
};

const focusLabelsKo: Record<string, string> = {
  'Batch Optimization': '배치 최적화',
  'Platform Modernization': '플랫폼 전환',
  'Data Reliability': '데이터 신뢰성',
};

export const metadata: Metadata = {
  title: '나준혁 | 데이터 엔지니어 포트폴리오 PDF',
  description: '채용 제출용으로 구성한 데이터 엔지니어 나준혁의 프로젝트 포트폴리오입니다.',
  robots: { index: false, follow: false },
};

function PageHeader({ section }: { section: string }) {
  return (
    <header className="portfolio-pdf-page-header">
      <span>{profile.nameEn}</span>
      <strong>{section}</strong>
    </header>
  );
}

function PageFooter({ page }: { page: number }) {
  return (
    <footer className="portfolio-pdf-page-footer">
      <span><a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href="https://junhyeok94-la.github.io/">junhyeok94-la.github.io</a></span>
      <span>{String(page).padStart(2, '0')} / {String(TOTAL_PAGES).padStart(2, '0')}</span>
    </footer>
  );
}

function SectionTitle({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="portfolio-pdf-section-title">
      <span>{number}</span>
      <div>
        <small>{eyebrow}</small>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function Contribution({ project }: { project: Project }) {
  if (!project.contribution) return null;
  return <span className="portfolio-pdf-contribution">기여도 <b>{project.contribution.rate}</b> · {project.contribution.basis}</span>;
}

function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  return (
    <article className={index === 4 ? 'portfolio-pdf-achievement portfolio-pdf-achievement-wide' : 'portfolio-pdf-achievement'}>
      <span>{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3>{item.title}</h3>
        <p><strong>문제</strong>{item.problem}</p>
        <p><strong>실행</strong>{item.action}</p>
        <p className="portfolio-pdf-result"><strong>성과</strong>{item.result}</p>
      </div>
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <article className="portfolio-pdf-compact-project">
      <header>
        <div>
          <span>{project.category}</span>
          <h3>{project.title}</h3>
        </div>
        <div>
          <strong>{project.period}</strong>
          <small>{project.role}</small>
          <Contribution project={project} />
        </div>
      </header>
      <p>{project.summary}</p>
      <div className="portfolio-pdf-mini-results">
        {project.achievements.map((achievement) => (
          <div key={achievement.title}><strong>{achievement.title}</strong><span>{achievement.result}</span></div>
        ))}
      </div>
      <small className="portfolio-pdf-stack">{project.stack.join(' · ')}</small>
    </article>
  );
}

export default function PortfolioPdfPage() {
  const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));
  const gsRetail = projectById['gs-retail-hbu'];
  const kics = projectById['next-kics'];
  const localFinance = projectById['local-finance'];
  const lgChem = projectById['lgchem-data-lake'];
  const foundations = [projectById['hanwha-esh'], projectById['ubase-hr']];

  return (
    <div className="portfolio-pdf-view">
      <style>{'@page { size: A4 landscape; margin: 0; }'}</style>
      <div className="portfolio-pdf-toolbar screen-only">
        <Link href="/"><ArrowLeft /> 포트폴리오</Link>
        <a href="/portfolio.pdf" download><Download /> 제출용 PDF 다운로드</a>
      </div>

      <main className="portfolio-pdf-pages">
        <section className="portfolio-pdf-page portfolio-pdf-cover">
          <div className="portfolio-pdf-cover-top">
            <span>NJH.</span>
            <small>DATA ENGINEER · PORTFOLIO 2026</small>
          </div>
          <div className="portfolio-pdf-cover-main">
            <span className="portfolio-pdf-cover-kicker">{profile.experienceLabel} · {profile.role}</span>
            <h1>{profile.name}<br /><em>Project Portfolio</em></h1>
            <p>{profile.headline}</p>
          </div>
          <div className="portfolio-pdf-cover-summary">
            <div className="portfolio-pdf-cover-profile">
              <small>CAREER SNAPSHOT</small>
              {profile.summary.map((text) => <p key={text}>{text}</p>)}
              <div className="portfolio-pdf-cover-career">
                {profile.employment.map((item, index) => (
                  <article key={item.company}>
                    <span>0{index + 1}</span>
                    <div><strong>{item.company}</strong><p>{item.position}</p><small>{item.period} · {item.duration}</small></div>
                  </article>
                ))}
              </div>
            </div>
            <aside>
              <small>CORE SIGNALS</small>
              {profile.focus.map((item, index) => (
                <div key={item.label}><span>0{index + 1}</span><strong>{focusLabelsKo[item.label] ?? item.label}</strong><p>{item.value}</p></div>
              ))}
            </aside>
          </div>
          <div className="portfolio-pdf-cover-credentials">
            <div>
              <strong>기술 역량</strong>
              <div className="portfolio-pdf-cover-skill-grid">
                {Object.entries(profile.skills).map(([group, skills]) => (
                  <article key={group}><span>{skillGroupLabelsKo[group] ?? group}</span><p>{skills.join(' · ')}</p></article>
                ))}
              </div>
            </div>
            <p><strong>보유 자격</strong>{credentials.certifications.map((item) => `${item.name} (${item.date})`).join(' · ')}</p>
          </div>
          <div className="portfolio-pdf-cover-footer">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href="https://junhyeok94-la.github.io/">junhyeok94-la.github.io</a>
            <span>UPDATED {profile.updatedAt}</span>
          </div>
        </section>

        <section className="portfolio-pdf-page">
          <PageHeader section="FLAGSHIP PROJECT" />
          <SectionTitle number="01" eyebrow="대표 프로젝트" title={gsRetail.title} description={gsRetail.summary} />
          <div className="portfolio-pdf-project-facts">
            <div><span>기간</span><strong>{gsRetail.period}</strong></div>
            <div><span>역할</span><strong>{gsRetail.role}</strong></div>
            <div><span>기여도</span><strong>{gsRetail.contribution?.rate}</strong><small>{gsRetail.contribution?.basis}</small></div>
          </div>
          <div className="portfolio-pdf-achievement-list">
            {gsRetail.achievements.map((item, index) => <AchievementCard item={item} index={index} key={item.title} />)}
          </div>
          <div className="portfolio-pdf-stack-bar"><strong>STACK</strong><span>{gsRetail.stack.join(' · ')}</span></div>
          <PageFooter page={2} />
        </section>

        <section className="portfolio-pdf-page">
          <PageHeader section="PROJECT HISTORY" />
          <SectionTitle number="02" eyebrow="프로젝트 이력" title="공공·민간 데이터 플랫폼 구축 경험" description="서로 다른 업무 맥락에서도 공통 표준, 자동화와 운영 가능한 구조를 중심으로 문제를 해결했습니다." />
          <div className="portfolio-pdf-project-history">
            {[kics, localFinance, lgChem].map((project) => <CompactProject project={project} key={project.id} />)}
          </div>
          <div className="portfolio-pdf-foundation-row">
            {foundations.map((project) => (
              <article key={project.id}>
                <span>{project.period}</span><h3>{project.title}</h3><p>{project.summary}</p><Contribution project={project} />
              </article>
            ))}
          </div>
          <section className="portfolio-pdf-transition">
            <div className="portfolio-pdf-transition-title">
              <span>NEXT CHAPTER</span>
              <h3>현업에서 쌓은 데이터 신뢰성 경험을<br />AI Agent 설계로 확장</h3>
            </div>
            <div className="portfolio-pdf-transition-copy">
              <p>수집·적재·모델링·배치 운영과 품질 검증 경험을 생성형 AI 서비스에 적용하기 위해 NIPA–NAVER Cloud Sovereign AI PBL에 참여했습니다.</p>
              <p><strong>이후 Pop-Talk만 설계 자료가 자세한 이유</strong>현업 프로젝트는 고객사 보안상 공개 가능한 문제·실행·성과를 중심으로 요약했습니다. 교육 팀 프로젝트인 Pop-Talk는 직접 만든 발표자료와 비식별 구현 화면을 활용할 수 있어 기획·Agent Flow·클라우드 아키텍처까지 상세히 보여드립니다.</p>
            </div>
            <dl><dt>프로젝트 성격</dt><dd>직무 교육 기반 4인 팀 프로젝트</dd><dt>검증 범위</dt><dd>RAG · LangGraph · NCP 서비스 구현</dd></dl>
          </section>
          <PageFooter page={3} />
        </section>

        <section className="portfolio-pdf-page portfolio-pdf-dark-page">
          <PageHeader section="AWARDED AI PROJECT" />
          <SectionTitle number="03" eyebrow="직무 교육 팀 프로젝트 · Pop Talk" title="추천을 생성하는 것보다 신뢰하게 만드는 문제" description={popTalk.overview} />
          <div className="portfolio-pdf-project-context"><strong>현업 역량의 확장</strong><span>데이터 파이프라인의 신뢰성·검증·재처리 관점을 영화 추천 Agent의 검색 근거 관리와 품질 검수 흐름으로 연결했습니다.</span></div>
          <div className="portfolio-pdf-pop-facts">
            <div><span>프로그램</span><strong>{popTalk.context}</strong></div>
            <div><span>협업</span><strong>{popTalk.team} · 기여도 40%</strong><small>{popTalk.role}</small></div>
            <div className="portfolio-pdf-award"><span>최종 평가</span><strong>{popTalk.award}</strong></div>
          </div>
          <div className="portfolio-pdf-pop-problem">
            <h3>해결하려 한 문제</h3>
            {popTalk.problem.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}
          </div>
          <div className="portfolio-pdf-value-grid">
            {popTalk.values.map((item, index) => <article key={item.name}><span>0{index + 1}</span><strong>{item.name}</strong><p>{item.description}</p></article>)}
          </div>
          <div className="portfolio-pdf-contribution-grid">
            {popTalk.contributions.map((item) => <article key={item.area}><span>{item.area}</span><strong>{item.title}</strong><p>{item.description}</p></article>)}
          </div>
          <div className="portfolio-pdf-snapshot">
            <span>DEMO SNAPSHOT · 2026.08</span>
            {popTalk.demoSnapshot.map((item) => <dl key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></dl>)}
          </div>
          <PageFooter page={4} />
        </section>

        <section className="portfolio-pdf-page">
          <PageHeader section="WORKING PRODUCT" />
          <SectionTitle number="04" eyebrow="Pop Talk · 구현 화면" title="사용자 경험부터 운영·검수까지" description="발표자료에 포함된 실제 구현 화면으로 추천 서비스와 데이터 운영 범위를 함께 보여줍니다." />
          <div className="portfolio-pdf-product-grid">
            {popTalk.productViews.map((item, index) => (
              <figure key={item.title}>
                <div><Image src={item.image} alt={item.alt} width={1900} height={930} loading="eager" unoptimized /></div>
                <figcaption><span>{index < 2 ? 'USER EXPERIENCE' : 'ADMIN OPERATIONS'}</span><strong>{item.title}</strong><p>{item.description}</p></figcaption>
              </figure>
            ))}
          </div>
          <PageFooter page={5} />
        </section>

        <section className="portfolio-pdf-page portfolio-pdf-agent-page">
          <PageHeader section="LANGGRAPH AGENT FLOW" />
          <SectionTitle number="05" eyebrow="Pop Talk · Agent 설계" title="실패 원인에 따라 필요한 단계부터 다시 실행" description="입력 검증부터 의도 분류, 검색, 생성, 품질 검수와 자가교정까지 실제 소스의 노드 및 점선 재시도 흐름을 그대로 반영했습니다." />
          <figure className="portfolio-pdf-agent-figure">
            <Image src="/projects/pop-talk/langgraph-flow-print.png" alt="Pop Talk LangGraph 노드 및 재시도 흐름" width={1600} height={900} loading="eager" unoptimized />
            <figcaption>실선은 기본 처리 경로, 점선은 검수 결과에 따른 재분류·재검색·재생성 및 Fallback 경로입니다.</figcaption>
          </figure>
          <div className="portfolio-pdf-data-flow">
            {popTalk.dataFlow.map((item, index) => <div key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
          </div>
          <p className="portfolio-pdf-online-note">노드별 상세 처리 로직과 설계 의도는 웹 포트폴리오의 인터랙티브 그래프에서 확인할 수 있습니다.</p>
          <PageFooter page={6} />
        </section>

        <section className="portfolio-pdf-page portfolio-pdf-architecture-page">
          <PageHeader section="ARCHITECTURE & NEXT" />
          <SectionTitle number="06" eyebrow="Pop Talk · 시스템 설계" title="서비스부터 PrivateLink까지 분리한 NCP 구조" description="사용자 트래픽과 외부 API·AI API의 진입 경로를 분리하고 Web·WAS·ChatBot·DB를 Private Subnet 중심으로 구성했습니다." />
          <figure className="portfolio-pdf-architecture-figure">
            <Image src="/projects/pop-talk/ncp-system-architecture.png" alt="Pop Talk NCP 시스템 아키텍처" width={2400} height={1350} loading="eager" unoptimized />
          </figure>
          <div className="portfolio-pdf-architecture-grid">
            {popTalk.architecture.map((item) => <article key={item.layer}><strong>{item.layer}</strong><p>{item.detail}</p></article>)}
          </div>
          <div className="portfolio-pdf-next-grid">
            <section>
              <h3>다음 고도화 과제</h3>
              {popTalk.roadmap.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><strong>{item.title}</strong><p>{item.description}</p></div></article>)}
            </section>
            <section>
              <h3>기술 스택</h3>
              {Object.entries(popTalk.stack).map(([group, items]) => <p key={group}><strong>{group}</strong><span>{items.join(' · ')}</span></p>)}
            </section>
          </div>
          <div className="portfolio-pdf-closing">
            <strong>운영 가능한 데이터 흐름을 설계합니다.</strong>
            <span><a href={`mailto:${profile.email}`}>{profile.email}</a> · <a href="https://junhyeok94-la.github.io/">https://junhyeok94-la.github.io/</a></span>
          </div>
          <PageFooter page={7} />
        </section>
      </main>
    </div>
  );
}
