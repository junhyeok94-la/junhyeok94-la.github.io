import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export type Focus = { label: string; value: string };
export type Employment = { company: string; period: string; duration: string; position: string };
export type Profile = {
  updatedAt: string;
  name: string;
  nameEn: string;
  role: string;
  experienceLabel: string;
  email: string;
  headline: string;
  summary: string[];
  focus: Focus[];
  skills: Record<string, string[]>;
  employment: Employment[];
};
export type Achievement = { title: string; problem: string; action: string; result: string };
export type Project = {
  id: string;
  title: string;
  category: string;
  period: string;
  role: string;
  company: string;
  featured: boolean;
  award?: string;
  detailPath?: string;
  summary: string;
  stack: string[];
  achievements: Achievement[];
};
export type Credentials = {
  education: Array<{ school: string; major: string; period: string; status: string }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    badgePath?: string;
  }>;
  training: Array<{ name: string; period: string; team?: string; award?: string; summary: string }>;
  languages: Array<{ language: string; level: string; date: string }>;
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
  productViews: Array<{ title: string; description: string; image: string; alt: string }>;
  demoSnapshot: Array<{ label: string; value: string }>;
  dataFlow: string[];
  agentFlow: Array<{ stage: string; detail: string }>;
  architecture: Array<{ layer: string; detail: string }>;
  stack: Record<string, string[]>;
  roadmap: string[];
  sourcesNote: string;
};

function loadYaml<T>(filename: string): T {
  const file = readFileSync(join(process.cwd(), 'content', filename), 'utf8');
  return parse(file) as T;
}

export const profile = loadYaml<Profile>('profile.yaml');
export const projects = loadYaml<Project[]>('projects.yaml');
export const credentials = loadYaml<Credentials>('credentials.yaml');
export const popTalk = loadYaml<PopTalk>('pop-talk.yaml');
