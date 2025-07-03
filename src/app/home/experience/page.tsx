import React from 'react';
import { Section } from '../about/section';
import { ExperienceCard } from './experienceCard';
import { RoleCard } from './roleCard';
import { WORK_EXPERIENCE_DATA, LEADERSHIP_ROLES_DATA, VOLUNTEER_EXPERIENCE_DATA } from '../constant';

const ExperiencePage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 md:px-8 pb-16">
            <header className="text-center py-8">
                <h1 className="text-4xl md:text-3xl font-extrabold text-gray-800">Professional Journey</h1>
                <p className="mt-2 text-lg text-gray-800/60">My experiences in the industry, leadership, and community.</p>
            </header>

            <div className="space-y-12">
                {/* Work Experience Section */}
                <Section title="Work Experience">
                    <div className="space-y-8">
                        {WORK_EXPERIENCE_DATA.map((exp, index) => (
                            <ExperienceCard key={index} experience={exp} />
                        ))}
                    </div>
                </Section>
                
                {/* Leadership & Volunteer Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <Section title="Leadership Roles">
                         <div className="space-y-6">
                            {LEADERSHIP_ROLES_DATA.map((role, index) => (
                                <RoleCard key={index} title={role.role} organization={role.organization} timeline={role.timeline} description={role.description} />
                            ))}
                        </div>
                    </Section>
                    <Section title="Volunteer Experience">
                        <div className="space-y-6">
                            {VOLUNTEER_EXPERIENCE_DATA.map((exp, index) => (
                                <RoleCard key={index} title={exp.role} organization={exp.organization} timeline={exp.timeline} description={exp.description} />
                            ))}
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;