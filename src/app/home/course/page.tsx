import React from 'react';
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
    console.log("Sorted Online Courses:", sortedOnlineCourses);
    const sortedGraduateCourses = graduateCourses ? [...graduateCourses].sort((a, b) => Number(b.ongoing) - Number(a.ongoing)) : [];
    return (
        <div className="container mx-auto px-4 md:px-8 pb-16">
            <header className="text-center py-8">
                <h1 className="text-4xl md:text-3xl font-extrabold text-gray-800">My Learning Journey</h1>
                <p className="mt-2 text-lg text-gray-400">A collection of my academic and self-paced learning activities.</p>
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