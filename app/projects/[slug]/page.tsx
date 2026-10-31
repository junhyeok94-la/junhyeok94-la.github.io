import type { Metadata } from 'next';
import Image from 'next/image';
import { ProjectDiagramImage } from '@/components/project-diagram-image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PortfolioFooter, PortfolioHeader } from '@/components/portfolio-shell';
import { caseStudies, projects } from '@/lib/content';
import styles from '@/components/portfolio.module.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  const study = caseStudies.find((item) => item.id === slug);
  return {
    title: `${project?.title ?? '프로젝트'} | 나준혁`,
    description: study?.overview,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.id === slug);
  const project = projects.find((item) => item.id === slug);
  if (!study || !project) notFound();
  const next =
    caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];
  const nextProject = projects.find((item) => item.id === next.id)!;

  return (
    <main className={styles.site}>
      <PortfolioHeader />
      <div className={styles.caseHero}>
        <Link className={styles.back} href="/#projects">
          <ArrowLeft size={15} /> 프로젝트 목록
        </Link>
        <p className={styles.eyebrow}>{study.label}</p>
        <h1>{project.title}</h1>
        <p className={styles.caseQuestion}>{study.question}</p>
        <dl className={styles.facts}>
          <div>
            <dt>수행기간</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>소속</dt>
            <dd>{project.company}</dd>
          </div>
          <div>
            <dt>담당 역할</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>
        <div className={styles.tags}>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <nav className={styles.caseNav} aria-label="프로젝트 목차">
        <a href="#overview">프로젝트 개요</a>
        {study.publicMaterials && <a href="#public-materials">공개 자료</a>}
        <a href="#architecture">아키텍처</a>
        {project.achievements.length > 0 && (
          <a href="#decisions">문제와 해결 과정</a>
        )}
        <a href="#results">결과와 회고</a>
      </nav>
      <div className={styles.caseBody}>
        <section id="overview" className={styles.caseSection}>
          <div className={styles.sectionLabel}>
            <span>01</span>
            <h2>프로젝트 개요</h2>
          </div>
          <p className={styles.lead}>{study.overview}</p>
          <div className={styles.scope}>
            <h3>내가 맡은 범위</h3>
            <ul>
              {study.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        {study.publicMaterials && (
          <section id="public-materials" className={styles.caseSection}>
            <div className={styles.sectionLabel}>
              <span>REFERENCE</span><h2>{study.publicMaterialsTitle ?? '공개된 서비스 화면과 보도자료'}</h2>
            </div>
            <p>{study.publicMaterialsNote ?? '정책지원시스템 전체의 공개 소개 자료입니다. 본인 담당 범위는 위 업무 목록과 아래 구현 설명에 정리했습니다.'}</p>
            <div className={styles.publicMaterials}>
              {study.publicMaterials.map((item) => (
                <figure key={item.url}>
                  {item.image && <a href={item.url} target="_blank" rel="noreferrer" aria-label={`${item.publisher}: ${item.title} 원문 보기`}>
                    <Image src={item.image} alt={item.title} width={item.width} height={item.height} unoptimized />
                  </a>}
                  <figcaption>
                    <small>{item.publisher} · {item.date}</small>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.credit && <span>{item.credit}</span>}
                    <a href={item.url} target="_blank" rel="noreferrer">자료 원문 <ArrowUpRight size={14} /></a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        <section id="architecture" className={styles.caseSection}>
          <div className={styles.sectionLabel}>
            <span>02</span>
            <h2>아키텍처와 데이터 흐름</h2>
          </div>
          <h3 className={styles.subheading}>{study.architecture.title}</h3>
          <p>{study.architecture.description}</p>
          {study.architecture.image ? (
            <figure className={styles.diagram}>
              <a
                href={study.architecture.image}
                target="_blank"
                rel="noreferrer"
                aria-label="구성도 원본 크게 보기"
              >
                <ProjectDiagramImage
                  src={study.architecture.image}
                  alt={study.architecture.alt ?? study.architecture.title}
                />
              </a>
              <figcaption>
                <span>재구성한 논리 흐름</span>
                {study.architecture.caption}
              </figcaption>
            </figure>
          ) : (
            <figure className={styles.diagram}>
              <ol className={styles.logicalSteps}>
                {study.architecture.steps?.map((item, index) => (
                  <li key={item}>
                    <small>0{index + 1}</small>
                    <strong>{item}</strong>
                  </li>
                ))}
              </ol>
              <figcaption>
                <span>기술 구성 개념도</span>
                {study.architecture.caption}
              </figcaption>
            </figure>
          )}
        </section>
        {project.achievements.length > 0 && (
          <section id="decisions" className={styles.caseSection}>
            <div className={styles.sectionLabel}>
              <span>03</span>
              <h2>문제와 해결 과정</h2>
            </div>
            <div className={styles.decisions}>
              {project.achievements.map((item, index) => (
                <article key={item.title}>
                  <div className={styles.decisionHeading}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <dl>
                    <div>
                      <dt>문제</dt>
                      <dd>{item.problem}</dd>
                    </div>
                    <div>
                      <dt>판단과 실행</dt>
                      <dd>{item.action}</dd>
                    </div>
                    <div className={styles.resultRow}>
                      <dt>결과</dt>
                      <dd>{item.result}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        )}
        {study.figures.length > 0 && (
          <section className={styles.caseSection}>
            <div className={styles.sectionLabel}>
              <span>DETAILS</span>
              <h2>구현 흐름 자세히 보기</h2>
            </div>
            {study.figures.map((item) => (
              <figure key={item.image} className={styles.diagram}>
                <h3>{item.title}</h3>
                <a
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.title} 원본 크게 보기`}
                >
                  <ProjectDiagramImage
                    src={item.image}
                    alt={item.alt}
                  />
                </a>
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </section>
        )}
        <section id="results" className={styles.caseSection}>
          <div className={styles.sectionLabel}>
            <span>RESULT</span>
            <h2>결과와 회고</h2>
          </div>
          <ul className={styles.resultList}>
            {study.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.retrospective}>
            <h3>이 프로젝트에서 남은 것</h3>
            <p>{study.takeaway}</p>
          </div>
          <p className={styles.scopeNote}>{study.limits}</p>
        </section>
        <Link className={styles.nextProject} href={`/projects/${next.id}/`}>
          <span>다음 프로젝트</span>
          <strong>{nextProject.title}</strong>
          <ArrowUpRight />
        </Link>
      </div>
      <PortfolioFooter />
    </main>
  );
}
