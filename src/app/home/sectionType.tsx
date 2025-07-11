
import type { ReactNode } from 'react';

export interface EducationItem {
  degree: string;
  institution: string;
  years?: string;
  logo: ReactNode;
  gpa?: string;
  skills?: string[]
}

export interface Hobby {
  name: string;
  description: string;
  icon: ReactNode;
}

export interface Achievement {
  title: string;
  issuer: string;
  year: string;
  icon: ReactNode;
}

export interface Project {
  name: string;
  timeline: string;
  ongoing: boolean;
  description: string;
  skills: string[];
}

export interface Recommendation {
    name: string;
    title: string;
    text: string;
}

export interface WorkExperience {
    company: string;
    role: string;
    timeline: string;
    description: string[];
    skills: string[];
    recommendation?: Recommendation;
}

export interface VolunteerExperience {
    organization: string;
    role: string;
    timeline: string;
    description: string;
}

export interface LeadershipRole {
    organization: string;
    role: string;
    timeline: string;
    description: string;
}

export interface Course {
  id: string;
  name: string;
  platform: string;
  year: string;
  description: string;
  skills: string[];
  ongoing?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
}