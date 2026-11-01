import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { LangGraphFlowEmbed } from '@/components/langgraph-flow-embed';
import { PortfolioFooter, PortfolioHeader } from '@/components/portfolio-shell';
import { ProjectDiagramImage } from '@/components/project-diagram-image';
import { popTalk } from '@/lib/content';
import styles from '@/components/portfolio.module.css';
import detail from './pop-talk.module.css';

export const metadata: Metadata = {
  title: 'Pop Talk | 나준혁 프로젝트 포트폴리오',
  description: '영화 추천 AI 서비스. 데이터 수집·RAG·LangGraph 검수와 NCP 인프라 구현에 참여한 4인 팀 프로젝트.',
};

const decisions = [
  { title: '영화 데이터 수집·통합', problem: '영화 정보와 포스터·줄거리·키워드가 서로 다른 API에 분산.', action: 'KOBIS·KMDB 데이터를 수집·정제·병합하고 PostgreSQL에 UPSERT.', result: '영화 메타데이터와 리뷰를 검색·추천의 공통 데이터로 활용.', logIds: [] },
  { title: '요청 의도별 검색 방식 분리', problem: '영화 추천과 리뷰 요약은 필요한 데이터와 조회 조건이 다름.', action: '국가·상영시간·제외 키워드를 QueryPlan으로 구조화하고 추천은 영화 프로필 벡터 검색으로 처리. 리뷰 요약은 스포일러 제외 조건을 적용한 SQL 조회로 분기.', result: '추천 후보와 대표 리뷰를 의도에 맞게 조회하고 근거 ID를 생성 컨텍스트에 전달.', logIds: ['log-query-plan', 'log-review-sql'] },
  { title: '근거 검증과 재시도 제한', problem: '생성 답변에 검색 근거에 없는 URL이나 사실이 포함되는 경우 발생.', action: '답변의 인용·URL을 검색 근거와 대조하고 LangGraph에서 실패 원인에 따라 재분류·재검색·재생성. 재시도 횟수 제한 적용.', result: '근거 없는 URL을 검출해 검수 실패 처리. 검수 실패가 지속되면 DB 조회 결과만 사용하는 제한 응답으로 종료.', logIds: ['log-evidence-guard'] },
];

function ProductView({ item, showCaption = true }: { item: (typeof popTalk.productViews)[number]; showCaption?: boolean }) {
  return (
    <figure className={detail.product}>
      <a href={item.image} target="_blank" rel="noreferrer" aria-label={`${item.title} 크게 보기`}>
        <Image src={item.image} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 760px) 100vw, 50vw" unoptimized />
      </a>
      {showCaption && <figcaption>{item.title}</figcaption>}
    </figure>
  );
}

export default function PopTalkPage() {
  return (
    <main className={styles.site}>
      <PortfolioHeader />
      <header className={styles.caseHero}>
        <Link className={styles.back} href="/#ai-project"><ArrowLeft size={15} /> 프로젝트 목록</Link>
        <p className={styles.eyebrow}>AI · 교육 팀 프로젝트</p>
        <h1>Pop Talk · 영화 추천 AI 서비스</h1>
        <p className={styles.caseQuestion}>KOBIS·KMDB 영화 데이터와 사용자 취향·상황을 바탕으로 추천하고, 응답 근거를 검수하는 서비스.</p>
        <dl className={styles.facts}>
          <div><dt>교육기간</dt><dd>{popTalk.period}<br />2주 교육·실습 + 1주 팀 프로젝트</dd></div>
          <div><dt>팀 · 결과</dt><dd>{popTalk.team} · 최종 평가 {popTalk.award}</dd></div>
          <div><dt>담당 역할</dt><dd>{popTalk.role}</dd></div>
        </dl>
        <p className={detail.program}>{popTalk.context}</p>
        <a className={detail.repository} href="https://github.com/junhyeok94-la/pop-talk" target="_blank" rel="noreferrer">GitHub 저장소 <ArrowUpRight size={15} /></a>
      </header>
      <nav className={styles.caseNav} aria-label="프로젝트 목차">
        <a href="#scope">담당 업무</a><a href="#product">팀 구현 결과</a><a href="#evidence">데이터 로그</a><a href="#architecture">아키텍처</a><a href="#decisions">문제와 해결</a><a href="#stack">사용 기술</a>
      </nav>
      <div className={styles.caseBody}>
        <section id="scope" className={styles.caseSection}>
          <div className={styles.sectionLabel}><span>01</span><h2>담당 업무</h2></div>
          <ul className={detail.scope}>
            <li><strong>데이터 수집</strong><span>KOBIS·KMDB 수집·정제·병합, PostgreSQL 적재.</span></li>
            <li><strong>RAG 검색</strong><span>영화 프로필 벡터 검색, 리뷰 SQL 조회와 검색 근거 전달.</span></li>
            <li><strong>AI Agent</strong><span>LangGraph 기반 응답 검수·재시도 흐름 구현.</span></li>
            <li><strong>NCP 인프라</strong><span>웹 애플리케이션 아키텍처 설계와 Terraform 구성 참여.</span></li>
          </ul>
        </section>
        <section id="product" className={styles.caseSection}>
          <div className={styles.sectionLabel}><span>02</span><h2>팀 구현 결과</h2></div>
          <p>4인 팀이 구현한 자연어 영화 추천, 영화 탐색·리뷰, 취향 입력 및 관리자 검수 화면. 교육 팀 프로젝트 우수상 수상.</p>
          <div className={detail.gallery}>{popTalk.productViews.slice(0, 2).map(item => <ProductView key={item.image} item={item} />)}</div>
          <details className={detail.disclosure}>
            <summary>관리자 대시보드·검수 화면 보기</summary>
            <div className={detail.gallery}>{popTalk.productViews.slice(2).map(item => <ProductView key={item.image} item={item} />)}</div>
            <p className={detail.note}>관리자 화면: {popTalk.demoSnapshot.map(item => `${item.label} ${item.value}`).join(' · ')}</p>
          </details>
        </section>
        <section id="evidence" className={styles.caseSection}>
          <div className={styles.sectionLabel}><span>LOG</span><h2>데이터 로그</h2></div>
          <p>요청 해석·데이터 조회·응답 검증의 세 가지 실행 사례.</p>
          {popTalk.logExamples.map((item, index) => (
            <article id={item.id} key={item.id} className={detail.logCase}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <details className={detail.disclosure} open={index === 0}>
                <summary>원문 로그 보기</summary>
                <ProductView item={item} showCaption={false} />
                <a className={detail.rawLog} href={item.rawFile} target="_blank" rel="noreferrer">JSONL 원문 보기 ↗</a>
              </details>
            </article>
          ))}
        </section>
        <section id="architecture" className={styles.caseSection}>
          <div className={styles.sectionLabel}><span>03</span><h2>시스템 아키텍처</h2></div>
          <p>Public LB → Web → Private LB → WAS·ChatBot. 수집 배치는 PostgreSQL에 적재하고, ChatBot은 pgvector 검색과 HyperCLOVA X를 사용.</p>
          <figure className={styles.diagram}>
            <a href="/projects/pop-talk/ncp-system-architecture.png" target="_blank" rel="noreferrer" aria-label="NCP 시스템 아키텍처 크게 보기">
              <Image src="/projects/pop-talk/ncp-system-architecture.png" alt="Pop Talk NCP 시스템 아키텍처: Web, WAS, ChatBot, Batch와 PostgreSQL 연결" width={2400} height={1350} sizes="(max-width: 1100px) 100vw, 1000px" unoptimized />
            </a>
          </figure>
          <div id="database" className={detail.database}>
            <h3>DB ERD · 핵심 데이터 모델</h3>
            <p>영화에 미디어·리뷰·프로필 임베딩·임베딩 작업을 연결하고, 사용자별 대화 세션과 메시지를 분리한 구조.</p>
            <figure className={styles.diagram}>
              <a href="/projects/pop-talk/database-erd.svg" target="_blank" rel="noreferrer" aria-label="Pop Talk 핵심 8개 테이블 ERD 크게 보기">
                <ProjectDiagramImage src="/projects/pop-talk/database-erd.svg" alt="영화, 미디어, 리뷰, 프로필 임베딩, 임베딩 작업 및 사용자, 대화 세션, 메시지의 8개 테이블과 실제 외래키 관계를 표시한 ERD" />
              </a>
            </figure>
          </div>
        </section>
        <section id="decisions" className={styles.caseSection}>
          <div className={styles.sectionLabel}><span>04</span><h2>문제와 해결</h2></div>
          <div className={styles.decisions}>
            {decisions.map((item, index) => (
              <article key={item.title}>
                <div className={styles.decisionHeading}><span>0{index + 1}</span><h3>{item.title}</h3></div>
                <dl><div><dt>문제</dt><dd>{item.problem}</dd></div><div><dt>구현</dt><dd>{item.action}</dd></div><div className={styles.resultRow}><dt>결과</dt><dd>{item.result}</dd></div></dl>
                {item.logIds.length > 0 && <div className={detail.logLinks}>{item.logIds.map(id => <a key={id} href={`#${id}`}>{popTalk.logExamples.find(log => log.id === id)?.title} 로그 ↗</a>)}</div>}
              </article>
            ))}
          </div>
          <details className={detail.disclosure}>
            <summary>LangGraph 전체 노드와 처리 로직 보기</summary>
            <LangGraphFlowEmbed />
          </details>
        </section>
        <section id="stack" className={styles.caseSection}>
          <div className={styles.sectionLabel}><span>05</span><h2>사용 기술</h2></div>
          <dl className={detail.stack}>{Object.entries(popTalk.stack).map(([group, items]) => <div key={group}><dt>{group}</dt><dd>{items.join(' · ')}</dd></div>)}</dl>
        </section>
      </div>
      <PortfolioFooter />
    </main>
  );
}
