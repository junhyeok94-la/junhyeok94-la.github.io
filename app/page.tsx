import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  DatabaseZap,
  GitBranch,
  Layers3,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { badgeVariants } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { credentials, profile, projects } from '@/lib/content';
import { cn } from '@/lib/utils';

const focusIcons = [GitBranch, DatabaseZap, ShieldCheck];

export default function Home() {
  const featured = projects.filter((project) => project.featured);
  const foundations = projects.filter((project) => !project.featured);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="맨 위로 이동">
          NJH<span>.</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#projects">Projects</a>
          <a href="#career">Career</a>
          <a href="#skills">Skills</a>
          <Link href="/resume">Resume</Link>
        </nav>
        <a className={cn(buttonVariants({ size: 'lg' }), 'header-contact')} href={`mailto:${profile.email}`}>
          Contact <ArrowUpRight />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            {profile.experienceLabel} · {profile.role}
          </div>
          <h1>
            현업의 맥락을 이해하고,
            <br />
            <span>운영 가능한 데이터 흐름</span>을 설계합니다.
          </h1>
          <div className="hero-summary">
            {profile.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="hero-actions">
            <a className={cn(buttonVariants({ size: 'lg' }), 'primary-action')} href="#projects">
              프로젝트 살펴보기 <ArrowDownRight />
            </a>
            <Link className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))} href="/resume">
              이력서 보기
            </Link>
          </div>
        </div>

        <aside className="signal-panel" id="focus" aria-label="핵심 역량">
          <div className="panel-heading"><span>CORE SIGNALS</span><span>2026</span></div>
          <div className="signal-orbit" aria-hidden="true">
            <span className="orbit-core">DE</span>
            <span className="orbit-ring orbit-ring-one" />
            <span className="orbit-ring orbit-ring-two" />
          </div>
          <div className="focus-list">
            {profile.focus.map((item, index) => {
              const Icon = focusIcons[index];
              return (
                <div className="focus-item" key={item.label}>
                  <Icon />
                  <div><strong>{item.label}</strong><span>{item.value}</span></div>
                </div>
              );
            })}
          </div>
        </aside>
      </section>

      <section className="project-preview" id="projects">
        <div className="section-heading">
          <div>
            <span className="section-number">01 / PROJECTS</span>
            <h2>복잡한 운영 문제를<br />구조로 해결한 경험</h2>
          </div>
          <p>최근 프로젝트부터 문제, 판단, 실행, 결과가 드러나는 사례를 정리했습니다.</p>
        </div>

        <div className="project-grid full-project-grid">
          {featured.map((project, index) => (
            <article className={cn('project-card', index === 0 && 'project-card-featured')} key={project.id}>
              <div className="project-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{project.category}</span>
              </div>
              <div>
                <p className="project-period">{project.period} · {project.role}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                {project.award && <span className="award-chip"><Award /> {project.award}</span>}
              </div>
              <div className="stack-list">
                {project.stack.map((skill) => (
                  <span className={badgeVariants({ variant: 'outline' })} key={skill}>{skill}</span>
                ))}
              </div>
              <div className="achievement-list">
                {project.achievements.slice(0, index === 0 ? 3 : 2).map((achievement) => (
                  <div className="achievement-item" key={achievement.title}>
                    <CheckCircle2 aria-hidden="true" />
                    <div>
                      <strong>{achievement.title}</strong>
                      <p>{achievement.result}</p>
                    </div>
                  </div>
                ))}
              </div>
              {project.detailPath && (
                <Link className="project-detail-link" href={project.detailPath}>
                  프로젝트 설계 자세히 보기 <ArrowUpRight />
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="foundation-block">
          <div>
            <span className="section-number">FOUNDATION</span>
            <h3>웹 개발에서 시작한<br />엔드투엔드 관점</h3>
          </div>
          <div className="foundation-list">
            {foundations.map((project) => (
              <article key={project.id}>
                <span>{project.period}</span>
                <h4>{project.title}</h4>
                <p>{project.summary}</p>
                <div className="stack-list">
                  {project.stack.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="career-section" id="career">
        <div className="section-kicker">
          <span className="section-number">02 / CAREER</span>
          <p>역할의 경계를 넘나들며 데이터 플랫폼의 전체 흐름을 이해해 왔습니다.</p>
        </div>
        <div className="career-timeline">
          {profile.employment.map((item, index) => (
            <article key={item.company}>
              <span className="timeline-index">0{index + 1}</span>
              <div>
                <p>{item.period} · {item.duration}</p>
                <h3>{item.company}</h3>
              </div>
              <strong>{item.position}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="skills-intro">
          <span className="section-number">03 / TOOLBOX</span>
          <h2>도구보다 먼저<br />문제의 성격을 봅니다.</h2>
          <p>수집부터 품질, 모델링, 운영 모니터링까지 상황에 맞는 도구를 조합합니다.</p>
        </div>
        <div className="skill-groups">
          {Object.entries(profile.skills).map(([group, skills], index) => (
            <article key={group}>
              <div className="skill-group-heading">
                <span>0{index + 1}</span>
                <h3>{group}</h3>
              </div>
              <div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="credential-section">
        <div className="credential-heading">
          <Layers3 />
          <div><span className="section-number">04 / CREDENTIALS</span><h2>계속 확장하는 기반 역량</h2></div>
        </div>
        <div className="credential-columns">
          <div>
            <h3>Education</h3>
            {credentials.education.map((item) => (
              <article key={item.school}><strong>{item.school}</strong><span>{item.major} · {item.period}</span></article>
            ))}
          </div>
          <div>
            <h3>Selected Certifications</h3>
            {credentials.certifications.slice(0, 4).map((item) => (
              <article className={item.badgePath ? 'credential-certification credential-certification-featured' : 'credential-certification'} key={item.name}>
                {item.badgePath && (
                  <Image
                    className="credential-badge"
                    src={item.badgePath}
                    alt={`${item.name} 공식 배지`}
                    width={72}
                    height={72}
                    unoptimized
                  />
                )}
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.issuer} · {item.date}</span>
                </div>
              </article>
            ))}
          </div>
          <div>
            <h3>Recent Learning</h3>
            {credentials.training.slice(0, 1).map((item) => (
              <article key={item.name}>
                <strong>{item.name}</strong>
                {(item.team || item.award) && <span className="credential-award">{[item.team, item.award].filter(Boolean).join(' · ')}</span>}
                <span>{item.summary}</span>
              </article>
            ))}
            <Link href="/resume">전체 이력서 보기 <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span>LET&apos;S BUILD RELIABLE DATA FLOWS.</span>
          <h2>데이터가 제시간에,<br />신뢰할 수 있게 흐르도록.</h2>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight /></a>
        </div>
        <p>© 2026 {profile.nameEn}. Last updated {profile.updatedAt}.</p>
      </footer>
    </main>
  );
}
