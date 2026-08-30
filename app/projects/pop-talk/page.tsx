import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Award, Bot, Database, Network, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { LangGraphFlowEmbed } from '@/components/langgraph-flow-embed';
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

      <section className="case-section case-contribution">
        <div className="case-section-heading">
          <span>03 / MY FOCUS</span>
          <h2>제가 집중한 구현 범위는<br />데이터에서 Agent 품질까지</h2>
          <p>팀 프로젝트 중 데이터·AI Agent 구현에 참여한 범위를 발표자료의 처리 흐름에 맞춰 구체화했습니다.</p>
        </div>
        <div className="contribution-grid">
          {popTalk.contributions.map((item, index) => (
            <article key={item.area}>
              <span>{String(index + 1).padStart(2, '0')} / {item.area}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-product">
        <div className="case-section-heading">
          <span>04 / WORKING PRODUCT</span>
          <h2>추천 화면뿐 아니라<br />운영과 검수까지 구현</h2>
          <p>발표자료에 포함된 실제 구현 화면입니다. 사용자 경험과 데이터 운영 화면을 함께 보여주어 서비스가 어디까지 완성됐는지 확인할 수 있습니다.</p>
        </div>
        <div className="product-gallery">
          {popTalk.productViews.map((item, index) => (
            <figure key={item.title} className={index < 2 ? 'product-view product-view-user' : 'product-view'}>
              <a href={item.image} target="_blank" rel="noreferrer" aria-label={`${item.title} 원본 크기로 보기`}>
                <Image src={item.image} alt={item.alt} width={1900} height={930} sizes="(max-width: 900px) 100vw, 50vw" unoptimized />
              </a>
              <figcaption>
                <span>{index < 2 ? 'USER EXPERIENCE' : 'ADMIN OPERATIONS'}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.image} target="_blank" rel="noreferrer">크게 보기 ↗</a>
              </figcaption>
            </figure>
          ))}
        </div>
        <aside className="demo-snapshot">
          <div>
            <span>DEMO SNAPSHOT · 2026.08</span>
            <strong>발표 시점 관리자 대시보드</strong>
            <p>사용자 성과 지표가 아닌, 수집·검수·운영 범위를 확인하기 위한 구현 데이터 스냅샷입니다.</p>
          </div>
          {popTalk.demoSnapshot.map((item) => (
            <dl key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></dl>
          ))}
        </aside>
      </section>

      <section className="case-section case-agent">
        <div className="case-section-heading light-heading">
          <span>05 / LANGGRAPH AGENT FLOW</span>
          <h2>실패 원인에 따라<br />이전 단계로 돌아가는 Agent</h2>
          <p>한 번 생성하고 끝내지 않습니다. 검색 근거와 응답 품질을 검수하고, 원인에 맞는 단계부터 다시 실행합니다.</p>
        </div>
        <LangGraphFlowEmbed />
      </section>

      <section className="case-section case-data">
        <div className="case-section-heading">
          <span>06 / GROUNDED DATA</span>
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
          <span>07 / ARCHITECTURE</span>
          <h2>서비스부터 PrivateLink까지<br />분리한 NCP 구조</h2>
          <p>사용자 트래픽, 외부 API, AI API의 진입 경로를 분리하고 Web·WAS·ChatBot·DB를 Private Subnet 중심으로 구성했습니다.</p>
        </div>
        <figure className="architecture-figure">
          <div className="architecture-image-scroll">
            <Image
              src="/projects/pop-talk/ncp-system-architecture.png"
              alt="Public Load Balancer, Web Server, Private Load Balancer, WAS와 ChatBot Server, PostgreSQL, Batch Server, Object Storage, NAT Gateway와 PrivateLink로 구성한 NCP 시스템 아키텍처"
              width={2400}
              height={1350}
              sizes="(max-width: 900px) 900px, 84vw"
              unoptimized
            />
          </div>
          <figcaption>
            <span>REQUEST PATH</span>
            <strong>Public LB → Web → Private LB → WAS / ChatBot</strong>
            <p>외부 데이터는 NAT Gateway, HyperCLOVA X는 PrivateLink를 통해 연결하고 운영 로그와 오브젝트 스토리지를 별도 관리합니다.</p>
            <a href="/projects/pop-talk/ncp-system-architecture.png" target="_blank" rel="noreferrer">원본 크기로 보기 ↗</a>
          </figcaption>
        </figure>
        <div className="architecture-grid">
          {popTalk.architecture.map((item, index) => {
            const Icon = architectureIcons[index];
            return <article key={item.layer}><Icon /><h3>{item.layer}</h3><p>{item.detail}</p></article>;
          })}
        </div>
      </section>

      <section className="case-section case-stack">
        <div className="case-section-heading">
          <span>08 / STACK</span>
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

      <section className="case-section case-outcome">
        <div className="case-section-heading light-heading">
          <span>09 / RESULT &amp; NEXT</span>
          <h2>완성한 범위와<br />다음 과제를 구분</h2>
        </div>
        <div className="outcome-grid">
          <article className="outcome-result">
            <Award />
            <span>FINAL EVALUATION</span>
            <h3>{popTalk.context}<br />{popTalk.award}</h3>
            <p>자연어 추천, 데이터 수집·RAG, 자가교정 Agent, 사용자·관리자 화면과 NCP 인프라까지 하나의 서비스로 통합했습니다.</p>
          </article>
          <article className="outcome-roadmap">
            <span>ROADMAP FROM PRESENTATION</span>
            <ol>
              {popTalk.roadmap.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>
              ))}
            </ol>
          </article>
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
