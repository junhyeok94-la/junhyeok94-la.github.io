import type { Metadata } from 'next';
import { ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { credentials, profile, projects, type Achievement, type Project } from '@/lib/content';

const projectCategoryLabelsKo: Record<string, string> = {
  'Private Sector': '민간 프로젝트',
  'Public Sector': '공공 프로젝트',
  'Web Foundation': '웹 개발 프로젝트',
  'AI PBL · Awarded Project': 'AI PBL · 수상 프로젝트',
};

const focusLabelsKo: Record<string, string> = {
  'Batch Optimization': '배치 최적화',
  'Platform Modernization': '플랫폼 전환',
  'Data Reliability': '데이터 신뢰성',
};

const skillGroupLabelsKo: Record<string, string> = {
  'Languages & Query': '프로그래밍·쿼리 언어',
  'Orchestration & Transformation': '오케스트레이션·변환',
  'Data Warehouse & Database': '데이터 웨어하우스·DB',
  'Cloud & Big Data': '클라우드·빅데이터',
  'DevOps & CI/CD': '개발 운영·CI/CD',
  'Documentation & Collaboration': '문서화·협업',
  'AI & Agent': 'AI·에이전트',
};

export const metadata: Metadata = {
  title: '나준혁 | 데이터 엔지니어 이력서',
  description: '데이터 엔지니어 나준혁의 경력, 프로젝트, 기술 및 자격 사항을 정리한 이력서입니다.',
  openGraph: {
    title: '나준혁 | 데이터 엔지니어 이력서',
    description: 'Airflow, dbt, AWS 기반 데이터 플랫폼 설계 및 운영 경험',
    images: [],
  },
  twitter: { card: 'summary', images: [] },
};

function AchievementList({ items }: { items: Achievement[] }) {
  return (
    <div className="resume-achievements">
      {items.map((item) => (
        <article key={item.title}>
          <h4>{item.title}</h4>
          <p><strong>문제</strong>{item.problem}</p>
          <p><strong>실행</strong>{item.action}</p>
          <p className="resume-result"><strong>성과</strong>{item.result}</p>
        </article>
      ))}
    </div>
  );
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className="resume-project-header">
      <div>
        <span>{projectCategoryLabelsKo[project.category] ?? project.category}</span>
        <h3>{project.title}</h3>
      </div>
      <div>
        <strong>{project.period}</strong>
        <span>{project.role}</span>
        {project.contribution && (
          <small className="resume-contribution">기여도 <b>{project.contribution.rate}</b> · {project.contribution.basis}</small>
        )}
      </div>
    </div>
  );
}

export default function ResumePage() {
  const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));
  const gsRetail = projectById['gs-retail-hbu'];
  const kics = projectById['next-kics'];
  const localFinance = projectById['local-finance'];
  const lgChem = projectById['lgchem-data-lake'];
  const hanwha = projectById['hanwha-esh'];
  const ubase = projectById['ubase-hr'];

  return (
    <div className="resume-view">
      <div className="resume-toolbar screen-only">
        <Link href="/"><ArrowLeft /> 포트폴리오</Link>
        <a href="/resume.pdf" download><Download /> PDF 다운로드</a>
      </div>

      <main className="resume-pages">
        <section className="resume-page">
          <header className="resume-header">
            <div>
              <span className="resume-label">데이터 엔지니어</span>
              <h1>{profile.name}</h1>
              <p>{profile.headline}</p>
            </div>
            <address>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>최종 수정 {profile.updatedAt}</span>
            </address>
          </header>

          <section className="resume-summary">
            <span>프로필</span>
            <div>{profile.summary.map((text) => <p key={text}>{text}</p>)}</div>
          </section>

          <div className="resume-two-column">
            <aside>
              <section className="resume-side-section">
                <h2>핵심 역량</h2>
                {profile.focus.map((item) => (
                  <div className="resume-focus" key={item.label}><strong>{focusLabelsKo[item.label] ?? item.label}</strong><span>{item.value}</span></div>
                ))}
              </section>
              <section className="resume-side-section">
                <h2>경력</h2>
                {profile.employment.map((item) => (
                  <div className="resume-career" key={item.company}>
                    <strong>{item.company}</strong><span>{item.position}</span><small>{item.period} · {item.duration}</small>
                  </div>
                ))}
              </section>
              <section className="resume-side-section">
                <h2>핵심 기술</h2>
                <div className="resume-tags">
                  {[
                    ...profile.skills['Languages & Query'].slice(0, 2),
                    ...profile.skills['Orchestration & Transformation'],
                    ...profile.skills['Data Warehouse & Database'].slice(0, 1),
                    ...profile.skills['Cloud & Big Data'].slice(0, 3),
                  ].map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </section>
            </aside>

            <div className="resume-main-column">
              <div className="resume-section-title"><span>01</span><h2>주요 프로젝트 경험</h2></div>
              <ProjectHeader project={gsRetail} />
              <p className="resume-project-summary">{gsRetail.summary}</p>
              <div className="resume-stack-line">{gsRetail.stack.join(' · ')}</div>
              <AchievementList items={gsRetail.achievements.slice(0, 3)} />
            </div>
          </div>
          <footer className="resume-page-footer"><span>{profile.nameEn} · 이력서</span><span>01 / 03</span></footer>
        </section>

        <section className="resume-page">
          <header className="resume-continuation"><span>{profile.nameEn}</span><strong>프로젝트 경험</strong></header>
          <div className="resume-section-title"><span>01</span><h2>주요 프로젝트 경험 · 계속</h2></div>

          <section className="resume-project-section">
            <ProjectHeader project={gsRetail} />
            <AchievementList items={gsRetail.achievements.slice(3)} />
          </section>
          <section className="resume-project-section">
            <ProjectHeader project={kics} />
            <p className="resume-project-summary">{kics.summary}</p>
            <div className="resume-stack-line">{kics.stack.join(' · ')}</div>
            <AchievementList items={kics.achievements} />
          </section>
          <section className="resume-project-section">
            <ProjectHeader project={localFinance} />
            <p className="resume-project-summary">{localFinance.summary}</p>
            <div className="resume-stack-line">{localFinance.stack.join(' · ')}</div>
            <AchievementList items={localFinance.achievements.slice(0, 2)} />
          </section>
          <footer className="resume-page-footer"><span>{profile.nameEn} · 이력서</span><span>02 / 03</span></footer>
        </section>

        <section className="resume-page">
          <header className="resume-continuation"><span>{profile.nameEn}</span><strong>경력 및 자격</strong></header>
          <div className="resume-section-title"><span>02</span><h2>추가 프로젝트 경험</h2></div>

          <section className="resume-project-section compact-project">
            <ProjectHeader project={lgChem} />
            <p className="resume-project-summary">{lgChem.summary}</p>
            <AchievementList items={lgChem.achievements} />
          </section>

          <div className="resume-foundation-row">
            {[hanwha, ubase].map((project) => (
              <article key={project.id}>
                <span>{project.period}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.contribution && <small className="resume-foundation-contribution">기여도 {project.contribution.rate} · {project.contribution.basis}</small>}
                <small>{project.stack.join(' · ')}</small>
              </article>
            ))}
          </div>

          <div className="resume-section-title resume-background-title"><span>03</span><h2>기술 및 자격</h2></div>
          <div className="resume-credential-grid">
            <section>
              <h3>기술 역량</h3>
              {Object.entries(profile.skills).map(([group, skills]) => (
                <div className="resume-skill-row" key={group}><strong>{skillGroupLabelsKo[group] ?? group}</strong><span>{skills.join(' · ')}</span></div>
              ))}
            </section>
            <section>
              <h3>학력</h3>
              {credentials.education.map((item) => (
                <div className="resume-credential-item" key={item.school}><strong>{item.school}</strong><span>{item.major} · {item.period}</span></div>
              ))}
              <h3 className="resume-subheading">어학</h3>
              {credentials.languages.map((item) => (
                <div className="resume-credential-item" key={item.language}><strong>{item.language} · {item.level}</strong><span>{item.date}</span></div>
              ))}
            </section>
            <section>
              <h3>자격증</h3>
              {credentials.certifications.map((item) => (
                <div className={item.badgePath ? 'resume-credential-item resume-credential-featured' : 'resume-credential-item'} key={item.name}>
                  {item.badgePath && (
                    <Image
                      className="resume-credential-badge"
                      src={item.badgePath}
                      alt=""
                      width={48}
                      height={48}
                      loading="eager"
                      unoptimized
                    />
                  )}
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.issuer} · {item.date}</span>
                  </div>
                </div>
              ))}
            </section>
          </div>
          <section className="resume-training">
            <h3>직무 교육 및 프로젝트</h3>
            {credentials.training.map((item) => (
              <div key={item.name}>
                <strong>{item.name}</strong>
                <span>{[item.period, item.team, item.award, item.contribution && `기여도 ${item.contribution.rate}`].filter(Boolean).join(' · ')}</span>
                <p>{item.summary}</p>
              </div>
            ))}
          </section>
          <footer className="resume-page-footer"><span>{profile.nameEn} · 이력서</span><span>03 / 03</span></footer>
        </section>
      </main>
    </div>
  );
}
