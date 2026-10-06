import Image from 'next/image';

import { credentials } from '@/lib/content';

export function LearningBadges({ variant }: { variant: 'web' | 'resume' | 'portfolio' }) {
  return (
    <section className={`learning-badges learning-badges-${variant}`}>
      <header className="learning-badges-heading">
        <h3>교육·실습</h3>
      </header>
      <div className="learning-badge-list">
        {credentials.learningBadges.map((item) => (
          <article key={item.verificationUrl}>
            <a className="learning-badge-image-link" href={item.verificationUrl} target="_blank" rel="noreferrer" aria-label={`${item.issuer} ${item.program}: ${item.name} 공식 배지 검증`}>
              <Image src={item.badgePath} alt="" width={1065} height={1065} loading="eager" unoptimized />
            </a>
            <div className="learning-badge-copy">
              <span className="learning-badge-meta">{item.issuer} · {item.label} · {item.date}</span>
              <h4><a href={item.verificationUrl} target="_blank" rel="noreferrer">{item.name}</a></h4>
              <p>{item.summary}</p>
              <span className="learning-badge-meta">{item.program}{item.assessment && ` · ${item.assessment}`}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
