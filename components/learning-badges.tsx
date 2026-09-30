import { credentials } from '@/lib/content';

export function LearningBadges({ variant }: { variant: 'web' | 'resume' | 'portfolio' }) {
  return (
    <section className={`learning-badges learning-badges-${variant}`}>
      <h3>실습 수료 배지</h3>
      <div className="learning-badge-list">
        {credentials.learningBadges.map((item) => (
          <article key={item.verificationUrl}>
            <span className="learning-badge-meta">{item.issuer} · {item.program} · {item.date}</span>
            <h4>{item.label} · {item.name}</h4>
            <p>{item.summary}</p>
            <a href={item.verificationUrl} target="_blank" rel="noreferrer" aria-label={`${item.label} ${item.name} 발급 내역 확인`}>발급 내역 확인 ↗</a>
          </article>
        ))}
      </div>
    </section>
  );
}
