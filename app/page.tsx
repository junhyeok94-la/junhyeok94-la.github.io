import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Award } from 'lucide-react';
import { PortfolioFooter, PortfolioHeader } from '@/components/portfolio-shell';
import { caseStudies, projects, popTalk } from '@/lib/content';
import styles from '@/components/portfolio.module.css';

export default function Home() {
  const platforms = caseStudies.filter((item) => item.type === 'platform');
  const webProjects = caseStudies.filter((item) => item.type === 'web');
  return (
    <main className={styles.site}>
      <PortfolioHeader />
      <section className={styles.hero}>
        <h1>나준혁 프로젝트 포트폴리오</h1>
        <div className={styles.heroBottom}>
          <a href="#projects">
            프로젝트 살펴보기 <ArrowDown size={18} />
          </a>
        </div>
      </section>

      <section id="projects" className={styles.indexSection}>
        <div className={styles.indexHeading}>
          <div>
            <p className={styles.eyebrow}>01 / PROFESSIONAL WORK</p>
            <h2>데이터 플랫폼 프로젝트</h2>
          </div>
        </div>
        <div className={styles.projectGrid}>
          {platforms.map((study, index) => {
            const project = projects.find((item) => item.id === study.id)!;
            return (
              <Link
                className={styles.projectCard}
                href={`/projects/${project.id}/`}
                key={project.id}
              >
                <div className={styles.cardTop}>
                  <span>
                    0{index + 1} / {study.label}
                  </span>
                  <ArrowUpRight size={22} />
                </div>
                <p className={styles.cardPeriod}>{project.period}</p>
                <h3>{project.title}</h3>
                <p className={styles.cardQuestion}>{study.question}</p>
                <div className={styles.cardImage}>
                  <Image
                    src={study.architecture.image!}
                    alt={study.architecture.alt!}
                    width={900}
                    height={320}
                    unoptimized
                  />
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.tags}>
                    {project.stack.slice(0, 4).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <span className={styles.readMore}>
                    설계와 문제 해결 과정 <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.webHeading}>
          <h3>웹 업무 시스템 개발</h3>
        </div>
        <div className={styles.webGrid}>
          {webProjects.map((study) => {
            const project = projects.find((item) => item.id === study.id)!;
            return (
              <Link
                className={styles.webCard}
                href={`/projects/${project.id}/`}
                key={project.id}
              >
                <div>
                  <span>{project.period}</span>
                  <ArrowUpRight size={20} />
                </div>
                <h3>{project.title}</h3>
                <p>{study.overview}</p>
                <div className={styles.tags}>
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="ai-project" className={styles.aiSection}>
        <div className={styles.aiIntro}>
          <p className={styles.eyebrow}>02 / AI · EXTERNAL PROJECT</p>
          <span className={styles.award}>
            <Award size={17} /> 교육 팀 프로젝트 · 우수상
          </span>
          <h2>
            Pop Talk
            <span>영화 추천 AI 서비스</span>
          </h2>
          <p>
            2주 교육·실습 후 마지막 1주 동안 진행한 4인 팀 프로젝트. KOBIS·KMDB
            데이터, RAG 검색, LangGraph 검수 흐름과 NCP 인프라를 하나의 서비스로
            연결했습니다.
          </p>
          <div className={styles.tags}>
            {[
              'HyperCLOVA X',
              'LangGraph',
              'RAG',
              'PostgreSQL / pgvector',
              'NCP',
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Link className={styles.aiLink} href="/projects/pop-talk/">
            실제 화면과 아키텍처 보기 <ArrowUpRight size={18} />
          </Link>
        </div>
        <figure className={styles.aiPreview}>
          <Link
            href="/projects/pop-talk/"
            aria-label="Pop Talk 실제 구현 화면과 상세 프로젝트 보기"
          >
            <Image
              src={popTalk.productViews[0].image}
              alt={popTalk.productViews[0].alt}
              width={1900}
              height={930}
              unoptimized
            />
          </Link>
          <figcaption>
            교육 팀 프로젝트의 실제 구현 화면 · 발표 시점 기준
          </figcaption>
        </figure>
      </section>
      <PortfolioFooter />
    </main>
  );
}
