import type { Metadata } from 'next';

import '@fontsource-variable/noto-sans-kr';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://junhyeok94-la.github.io/'),
  title: '나준혁 | 프로젝트 포트폴리오',
  description:
    '데이터 플랫폼 구축, 배치 최적화, 공공 데이터 모델링과 AI Agent 프로젝트의 설계·구현·문제 해결 기록.',
  openGraph: {
    title: '나준혁 · 프로젝트 포트폴리오',
    description: '프로젝트별 아키텍처, 담당 범위와 문제 해결 과정',
    images: [{ url: 'https://junhyeok94-la.github.io/og.png', width: 1200, height: 630, alt: '나준혁 데이터 엔지니어 포트폴리오' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '나준혁 · 프로젝트 포트폴리오',
    description: '프로젝트별 아키텍처, 담당 범위와 문제 해결 과정',
    images: ['https://junhyeok94-la.github.io/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
