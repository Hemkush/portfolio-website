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
import  CourseCard  from './courseCard';
import { getCoursework } from '@/app/lib/data';



// const CourseworkPage: React.FC = () => {
export default async function CourseworkPage() {
    const courseData = await getCoursework();
    const onlineCourses = [];
    const graduateCourses = [];

if (courseData) {
  for (const courseDetail of courseData) {
    if (courseDetail.course_platform !== "Robert H. Smith School of Business (UMD)") {
       onlineCourses.push(courseDetail);
    } else {
      graduateCourses.push(courseDetail);
    }
  }
} else {
  console.log("No course data found.");
}

// onlineCourses = courseData?.filter((courseDetail) => courseDetail.course_platform !== "Robert H. Smith School of Business (UMD)") || [];
// graduateCourses = courseData?.filter((courseDetail) => courseDetail.course_platform === "Robert H. Smith School of Business (UMD)") || [];

    const sortedOnlineCourses = onlineCourses ? [...onlineCourses].sort((a, b) => Number(b.course_status) - Number(a.course_status)) : [];
    const sortedGraduateCourses = graduateCourses ? [...graduateCourses].sort((a, b) => Number(b.course_status) - Number(a.course_status)) : [];
    return (
        <div className="page-shell">
            <header className="page-header">
                <h1 className="page-title">My Learning Journey</h1>
                <p className="page-subtitle">A collection of my academic and self-paced learning activities.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 lg:items-start">
                <Section title="Graduate Coursework">
                    <div className="space-y-8">
                        {sortedGraduateCourses.map((course) => (
                            <CourseCard key={course.course_id}  
                            name={course.course_name} 
                            description={course.course_description} 
                            date={course.course_completion_year}
                            skills={course.learned_skills}
                            ongoing={course.course_status}
                            platform={course.course_platform}/>
                        ))}
                    </div>
                </Section>
                <Section title="Online Certifications & Courses">
                     {/* <div className="space-y-8">
                        {sortedOnlineCourses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div> */}
                    <div className="space-y-8">
                        {sortedOnlineCourses.map((course) => (
                            <CourseCard key={course.course_id}  
                            name={course.course_name} 
                            description={course.course_description} 
                            date={course.course_completion_year}
                            skills={course.learned_skills}
                            ongoing={course.course_status}
                            platform={course.course_platform}/>
                        ))}
                    </div>
                </Section>
            </div>
        </div>
    );
};

// export default CourseworkPage;
