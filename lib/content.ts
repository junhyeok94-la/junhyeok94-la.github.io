import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export type Profile = {
  updatedAt: string;
  name: string;
  nameEn: string;
  role: string;
  email: string;
};
export type Achievement = {
  title: string;
  problem: string;
  action: string;
  result: string;
  summary?: string;
};
export type Contribution = { rate: string; basis: string };
export type Project = {
  id: string;
  title: string;
  category: string;
  period: string;
  role: string;
  contribution?: Contribution;
  company: string;
  featured: boolean;
  award?: string;
  detailPath?: string;
  summary: string;
  stack: string[];
  achievements: Achievement[];
};
export type CaseFigure = {
  title: string;
  image: string;
  maxWidth?: number;
  alt: string;
  caption: string;
};
export type CaseStudy = {
  id: string;
  type: 'platform' | 'web';
  label: string;
  question: string;
  overview: string;
  scope: string[];
  serviceContext?: {
    title: string;
    description: string;
    items: string[];
    note: string;
  };
  architecture: {
    title: string;
    description: string;
    image?: string;
    alt?: string;
    steps?: string[];
    caption: string;
  };
  figures: CaseFigure[];
  publicMaterialsTitle?: string;
  publicMaterialsNote?: string;
  publicMaterials?: Array<{
    title: string;
    url: string;
    publisher: string;
    date: string;
    description: string;
    image?: string;
    width?: number;
    height?: number;
    credit?: string;
  }>;
  results: string[];
  limits: string;
  takeaway: string;
};
export type PopTalk = {
  title: string;
  subtitle: string;
  context: string;
  period: string;
  team: string;
  award: string;
  role: string;
  overview: string;
  problem: string[];
  values: Array<{ name: string; description: string }>;
  contributions: Array<{ area: string; title: string; description: string }>;
  productViews: Array<{
    title: string;
    description: string;
    image: string;
    width: number;
    height: number;
    alt: string;
  }>;
  demoSnapshot: Array<{ label: string; value: string }>;
  dataFlow: string[];
  agentFlow: Array<{ stage: string; detail: string }>;
  architecture: Array<{ layer: string; detail: string }>;
  stack: Record<string, string[]>;
  roadmap: Array<{ title: string; description: string }>;
  sourcesNote: string;
  runtimeExamples: Array<{ title: string; observation: string; action: string; result: string }>;
  runtimeNote: string;
  databaseExamples: Array<{
    title: string;
    description: string;
    image: string;
    width: number;
    height: number;
    alt: string;
  }>;
};
function loadYaml<T>(filename: string): T {
  return parse(
    readFileSync(join(process.cwd(), 'content', filename), 'utf8'),
  ) as T;
}
export const profile = loadYaml<Profile>('profile.yaml');
export const projects = loadYaml<Project[]>('projects.yaml');
export const popTalk = loadYaml<PopTalk>('pop-talk.yaml');
export const caseStudies = loadYaml<CaseStudy[]>('case-studies.yaml');
