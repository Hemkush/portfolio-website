
import type { ReactNode } from 'react';

export interface EducationItem {
  degree: string;
  institution: string;
  years: string;
  logo: ReactNode;
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
