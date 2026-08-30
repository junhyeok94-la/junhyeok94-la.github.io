import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://junhyeok94-la.github.io/'),
  title: '나준혁 | 데이터 엔지니어',
  description:
    'Airflow, dbt, AWS 기반 데이터 플랫폼을 설계하고 운영해 온 데이터 엔지니어 나준혁의 포트폴리오입니다.',
  openGraph: {
    title: '나준혁 · Data Engineer',
    description: '운영 가능한 데이터 흐름을 설계합니다.',
    images: [{ url: 'https://junhyeok94-la.github.io/og.png', width: 1200, height: 630, alt: '나준혁 데이터 엔지니어 포트폴리오' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '나준혁 · Data Engineer',
    description: '운영 가능한 데이터 흐름을 설계합니다.',
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
