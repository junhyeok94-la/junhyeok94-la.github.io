import type { Metadata } from 'next';
import { ArrowLeft, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { credentials, profile, projects, type Achievement, type Project } from '@/lib/content';

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
        <span>{project.category}</span>
        <h3>{project.title}</h3>
      </div>
      <div><strong>{project.period}</strong><span>{project.role}</span></div>
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
              <span className="resume-label">DATA ENGINEER</span>
              <h1>{profile.name}</h1>
              <p>{profile.headline}</p>
            </div>
            <address>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span>Updated {profile.updatedAt}</span>
            </address>
          </header>

          <section className="resume-summary">
            <span>PROFILE</span>
            <div>{profile.summary.map((text) => <p key={text}>{text}</p>)}</div>
          </section>

          <div className="resume-two-column">
            <aside>
              <section className="resume-side-section">
                <h2>Core Focus</h2>
                {profile.focus.map((item) => (
                  <div className="resume-focus" key={item.label}><strong>{item.label}</strong><span>{item.value}</span></div>
                ))}
              </section>
              <section className="resume-side-section">
                <h2>Career</h2>
                {profile.employment.map((item) => (
                  <div className="resume-career" key={item.company}>
                    <strong>{item.company}</strong><span>{item.position}</span><small>{item.period} · {item.duration}</small>
                  </div>
                ))}
              </section>
              <section className="resume-side-section">
                <h2>Core Stack</h2>
                <div className="resume-tags">
                  {[...profile.skills['Data Pipeline'], ...profile.skills['Data Platform'].slice(0, 4)].map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </section>
            </aside>

            <div className="resume-main-column">
              <div className="resume-section-title"><span>01</span><h2>Selected Experience</h2></div>
              <ProjectHeader project={gsRetail} />
              <p className="resume-project-summary">{gsRetail.summary}</p>
              <div className="resume-stack-line">{gsRetail.stack.join(' · ')}</div>
              <AchievementList items={gsRetail.achievements.slice(0, 3)} />
            </div>
          </div>
          <footer className="resume-page-footer"><span>{profile.nameEn} · Resume</span><span>01 / 03</span></footer>
        </section>

        <section className="resume-page">
          <header className="resume-continuation"><span>{profile.nameEn}</span><strong>PROJECT EXPERIENCE</strong></header>
          <div className="resume-section-title"><span>01</span><h2>Selected Experience · Continued</h2></div>

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
          <footer className="resume-page-footer"><span>{profile.nameEn} · Resume</span><span>02 / 03</span></footer>
        </section>

        <section className="resume-page">
          <header className="resume-continuation"><span>{profile.nameEn}</span><strong>BACKGROUND & CREDENTIALS</strong></header>
          <div className="resume-section-title"><span>02</span><h2>Additional Experience</h2></div>

          <section className="resume-project-section compact-project">
            <ProjectHeader project={lgChem} />
            <p className="resume-project-summary">{lgChem.summary}</p>
            <AchievementList items={lgChem.achievements} />
          </section>

          <div className="resume-foundation-row">
            {[hanwha, ubase].map((project) => (
              <article key={project.id}><span>{project.period}</span><h3>{project.title}</h3><p>{project.summary}</p><small>{project.stack.join(' · ')}</small></article>
            ))}
          </div>

          <div className="resume-section-title resume-background-title"><span>03</span><h2>Skills & Credentials</h2></div>
          <div className="resume-credential-grid">
            <section>
              <h3>Technical Skills</h3>
              {Object.entries(profile.skills).map(([group, skills]) => (
                <div className="resume-skill-row" key={group}><strong>{group}</strong><span>{skills.join(' · ')}</span></div>
              ))}
            </section>
            <section>
              <h3>Education</h3>
              {credentials.education.map((item) => (
                <div className="resume-credential-item" key={item.school}><strong>{item.school}</strong><span>{item.major} · {item.period}</span></div>
              ))}
              <h3 className="resume-subheading">Language</h3>
              {credentials.languages.map((item) => (
                <div className="resume-credential-item" key={item.language}><strong>{item.language} · {item.level}</strong><span>{item.date}</span></div>
              ))}
            </section>
            <section>
              <h3>Certifications</h3>
              {credentials.certifications.map((item) => (
                <div className={item.badgePath ? 'resume-credential-item resume-credential-featured' : 'resume-credential-item'} key={item.name}>
                  {item.badgePath && (
                    <Image
                      className="resume-credential-badge"
                      src={item.badgePath}
                      alt=""
                      width={48}
                      height={48}
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
            <h3>Recent Learning</h3>
            {credentials.training.map((item) => (
              <div key={item.name}>
                <strong>{item.name}</strong>
                <span>{[item.period, item.team, item.award].filter(Boolean).join(' · ')}</span>
                <p>{item.summary}</p>
              </div>
            ))}
          </section>
          <footer className="resume-page-footer"><span>{profile.nameEn} · Resume</span><span>03 / 03</span></footer>
        </section>
      </main>
    </div>
  );
}
