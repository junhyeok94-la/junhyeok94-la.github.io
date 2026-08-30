import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Award, Bot, Database, Network, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { badgeVariants } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { popTalk } from '@/lib/content';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pop Talk AI Agent | 나준혁 포트폴리오',
  description: 'HyperCLOVA X, RAG, LangGraph와 NAVER Cloud Platform을 결합한 수상 팀 프로젝트입니다.',
  openGraph: {
    title: 'Pop Talk · Personal Movie AI Agent',
    description: '근거를 검색하고 답변을 스스로 검수하는 영화 추천 멀티 챗봇 에이전트',
  },
};

const architectureIcons = [Bot, Database, Network, ShieldCheck];

export default function PopTalkPage() {
  return (
    <main className="case-study">
      <header className="case-header">
        <Link href="/"><ArrowLeft /> Portfolio</Link>
        <Link href="/resume">Resume <ArrowUpRight /></Link>
      </header>

      <section className="case-hero">
        <div className="case-kicker">AWARDED AI PBL PROJECT · 2026</div>
        <h1>{popTalk.title}</h1>
        <p className="case-subtitle">{popTalk.subtitle}</p>
        <p className="case-overview">{popTalk.overview}</p>
        <div className="case-facts">
          <div><span>Program</span><strong>{popTalk.context}</strong></div>
          <div><span>Collaboration</span><strong>{popTalk.team} · {popTalk.role}</strong></div>
          <div className="case-award"><Award /><span>Result</span><strong>{popTalk.award}</strong></div>
        </div>
      </section>

      <section className="case-section case-problem">
        <div className="case-section-heading">
          <span>01 / PROBLEM</span>
          <h2>추천을 생성하는 것보다<br />신뢰하게 만드는 문제</h2>
        </div>
        <ol>
          {popTalk.problem.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>
          ))}
        </ol>
      </section>

      <section className="case-section case-values">
        <div className="case-section-heading">
          <span>02 / PRODUCT PRINCIPLES</span>
          <h2>개인화부터 검증까지<br />네 가지 설계 원칙</h2>
        </div>
        <div className="value-grid">
          {popTalk.values.map((item, index) => (
            <article key={item.name}><span>0{index + 1}</span><h3>{item.name}</h3><p>{item.description}</p></article>
          ))}
        </div>
      </section>

      <section className="case-section case-agent">
        <div className="case-section-heading light-heading">
          <span>03 / LANGGRAPH AGENT FLOW</span>
          <h2>실패 원인에 따라<br />이전 단계로 돌아가는 Agent</h2>
          <p>한 번 생성하고 끝내지 않습니다. 검색 근거와 응답 품질을 검수하고, 원인에 맞는 단계부터 다시 실행합니다.</p>
        </div>
        <div className="agent-flow">
          {popTalk.agentFlow.map((item, index) => (
            <article key={item.stage}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{item.stage}</h3><p>{item.detail}</p></div>
            </article>
          ))}
        </div>
        <div className="retry-loop">REVIEW FAILED → RE-CLASSIFY · RE-PLAN · RE-RETRIEVE · RE-GENERATE</div>
      </section>

      <section className="case-section case-data">
        <div className="case-section-heading">
          <span>04 / GROUNDED DATA</span>
          <h2>영화 공공데이터에서<br />답변 근거까지</h2>
        </div>
        <div className="data-flow">
          {popTalk.dataFlow.map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>
          ))}
        </div>
      </section>

      <section className="case-section case-architecture">
        <div className="case-section-heading">
          <span>05 / ARCHITECTURE</span>
          <h2>서비스부터 PrivateLink까지<br />분리한 NCP 구조</h2>
        </div>
        <div className="architecture-grid">
          {popTalk.architecture.map((item, index) => {
            const Icon = architectureIcons[index];
            return <article key={item.layer}><Icon /><h3>{item.layer}</h3><p>{item.detail}</p></article>;
          })}
        </div>
      </section>

      <section className="case-section case-stack">
        <div className="case-section-heading">
          <span>06 / STACK</span>
          <h2>학습한 기술을<br />하나의 서비스로 통합</h2>
        </div>
        <div className="case-stack-groups">
          {Object.entries(popTalk.stack).map(([group, items]) => (
            <article key={group}>
              <h3>{group}</h3>
              <div>{items.map((item) => <span className={badgeVariants({ variant: 'outline' })} key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <footer className="case-footer">
        <div><Award /><span>{popTalk.team}</span><strong>최종 평가 {popTalk.award}</strong></div>
        <p>{popTalk.sourcesNote}</p>
        <div className="case-footer-actions">
          <Link className={cn(buttonVariants({ size: 'lg' }), 'primary-action')} href="/">포트폴리오로 돌아가기</Link>
          <Link className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))} href="/resume">이력서 보기</Link>
        </div>
      </footer>
    </main>
  );
}
