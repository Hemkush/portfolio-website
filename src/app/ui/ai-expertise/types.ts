export type Skill = {
  name: string;
  level: number;
  proof: string;
};

export type SkillCategory = {
  id: string;
  label: string;
  icon: string;
  color: string;
  glow: string;
  skills: Skill[];
};

export type AcademicCourseApplied = {
  project: string;
  detail: string;
};

export type AcademicCourse = {
  code: string;
  name: string;
  institution: string;
  grade: string;
  color: string;
  icon: string;
  summary: string;
  topics: string[];
  applied: AcademicCourseApplied[];
};

export type Project = {
  name: string;
  role: string;
  tags: string[];
  color: string;
  highlight: string;
  skills: string[];
  impactMetrics?: string[];
  problem?: string;
  architecture?: string;
  tradeoffs?: string;
};

export type ProofPoint = {
  stat: string;
  label: string;
  sub: string;
};

export type Differentiator = {
  icon: string;
  color: string;
  title: string;
  body: string;
};

