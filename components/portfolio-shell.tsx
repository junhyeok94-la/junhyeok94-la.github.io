import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/content';
import styles from './portfolio.module.css';

export function PortfolioHeader() {
  return (
    <header className={styles.header}>
      <Link
        className={styles.brand}
        href="/"
        aria-label="나준혁 프로젝트 포트폴리오 홈"
      >
        NJH<span>.</span>
        <small>PROJECT ARCHIVE</small>
      </Link>
      <nav aria-label="주요 메뉴">
        <Link href="/#projects">실무 프로젝트</Link>
        <Link href="/#ai-project">AI · 외부 활동</Link>
        <a href={`mailto:${profile.email}`}>
          Contact <ArrowUpRight size={14} />
        </a>
      </nav>
    </header>
  );
}

export function PortfolioFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <Link className={styles.brand} href="/">
          NJH<span>.</span>
        </Link>
        <p>프로젝트의 설계와 문제 해결 과정을 기록합니다.</p>
      </div>
      <a href={`mailto:${profile.email}`}>
        {profile.email} <ArrowUpRight size={16} />
      </a>
      <small>
        © {new Date().getFullYear()} {profile.nameEn} · PROJECT PORTFOLIO
      </small>
    </footer>
  );
}
