import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Coursework',
  description:
    'Graduate and online coursework by Hemant Kushwaha — MS Information Systems at UMD covering AI, machine learning, data analytics, and database management, plus industry certifications in deep learning, NLP, and cloud engineering.',
  keywords: [
    'UMD coursework', 'MS Information Systems courses', 'University of Maryland AI courses',
    'machine learning coursework', 'data analytics graduate', 'AI certification',
    'deep learning course', 'NLP certification', 'database management', 'Hemant Kushwaha education',
    'AI engineer education', 'graduate courses AI', 'Smith School of Business',
    'online AI courses', 'Coursera machine learning',
  ],
  alternates: { canonical: 'https://hemant-kushwaha.vercel.app/home/course' },
  openGraph: {
    title: 'Coursework — Hemant Kushwaha',
    description:
      'UMD MS Information Systems graduate courses + online certifications: AI, machine learning, NLP, data analytics, and cloud engineering.',
    url: 'https://hemant-kushwaha.vercel.app/home/course',
    images: [{ url: '/profile.png', width: 800, height: 800, alt: 'Hemant Kushwaha — Coursework' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coursework — Hemant Kushwaha',
    description: 'UMD MS Information Systems · AI, ML, data analytics grad courses + industry certifications.',
    images: ['/profile.png'],
  },
};
import { Section } from '../about/section';
import CourseCard from './courseCard';
import { getCoursework } from '@/app/lib/data';
import { AnimatedPageHeader, FadeUp, Stagger, StaggerItem } from '@/app/ui/components/animations';

export default async function CourseworkPage() {
  const courseData = await getCoursework();
  const onlineCourses = [];
  const graduateCourses = [];

  if (courseData) {
    for (const courseDetail of courseData) {
      if (courseDetail.course_platform !== 'Robert H. Smith School of Business (UMD)') {
        onlineCourses.push(courseDetail);
      } else {
        graduateCourses.push(courseDetail);
      }
    }
  }

  const sortedOnlineCourses = onlineCourses
    ? [...onlineCourses].sort((a, b) => Number(b.course_status) - Number(a.course_status))
    : [];
  const sortedGraduateCourses = graduateCourses
    ? [...graduateCourses].sort((a, b) => Number(b.course_status) - Number(a.course_status))
    : [];

  return (
    <div className="page-shell">
      <AnimatedPageHeader
        title="My Learning Journey"
        subtitle="A collection of my academic and self-paced learning activities."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 lg:items-start">
        <FadeUp delay={0.1}>
          <Section title="Graduate Coursework">
            <Stagger className="space-y-8" staggerDelay={0.08}>
              {sortedGraduateCourses.map((course) => (
                <StaggerItem key={course.course_id}>
                  <CourseCard
                    name={course.course_name}
                    description={course.course_description}
                    date={course.course_completion_year}
                    skills={course.learned_skills}
                    ongoing={course.course_status}
                    platform={course.course_platform}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </Section>
        </FadeUp>

        <FadeUp delay={0.2}>
          <Section title="Online Certifications & Courses">
            <Stagger className="space-y-8" staggerDelay={0.08}>
              {sortedOnlineCourses.map((course) => (
                <StaggerItem key={course.course_id}>
                  <CourseCard
                    name={course.course_name}
                    description={course.course_description}
                    date={course.course_completion_year}
                    skills={course.learned_skills}
                    ongoing={course.course_status}
                    platform={course.course_platform}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </Section>
        </FadeUp>
      </div>
    </div>
  );
}
