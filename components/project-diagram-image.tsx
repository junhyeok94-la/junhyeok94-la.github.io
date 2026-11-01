import Image from 'next/image';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Keep the exported SVG's own aspect ratio, including very wide flow diagrams.
export function ProjectDiagramImage({ src, alt, maxWidth }: { src: string; alt: string; maxWidth?: number }) {
  const svg = readFileSync(join(process.cwd(), 'public', src), 'utf8');
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1].split(/\s+/).map(Number);
  if (!viewBox || viewBox.length !== 4 || !viewBox[2] || !viewBox[3]) {
    throw new Error(`Missing SVG viewBox: ${src}`);
  }
  return <Image src={src} alt={alt} width={viewBox[2]} height={viewBox[3]} style={maxWidth ? { maxWidth, marginInline: 'auto' } : undefined} unoptimized />;
}
