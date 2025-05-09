'use client';

import React from 'react';
import {
    Users,
    UserCircle,
    Briefcase,
    Mail,
    Building2,
    GraduationCap,
    Newspaper,
    UserPlus,
    ScrollText,
    Gavel,
    Wallet,
    Laptop,
    Calendar
} from 'lucide-react';

const LeadershipCard = ({ title, name, role, email, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-[#E71108]" />
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-[#E71108] font-medium mt-1">{name}</p>
                <p className="text-gray-600 mt-2 text-sm">{role}</p>
                {email && (
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        <a href={`mailto:${email}`} className="hover:text-[#E71108]">
                            {email}
                        </a>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const JointSecretarySection = ({ title, name, description, icon: Icon }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon className="h-6 w-6 text-[#E71108]" />
            </div>
        </div>
        <div className="flex-1">
            <span className="text-sm text-gray-600">Post of Joint Secretaries</span>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-[#E71108] font-medium mt-1">{name}</p>
            <p className="text-gray-600 mt-2 text-sm">{description}</p>
            {/* {email && (
                <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${email}`} className="hover:text-[#E71108]">
                        {email}
                    </a>
                </div>
            )} */}
        </div>
    </div>
</div>
);

const Leadership = () => {
    return (
        <div className="min-h-screen bg-[#f2d8a2] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Meet the Leadership Team</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        The Uttar Pradesh Federation of Distributor Associations (UPFDA) is guided by a dedicated team of leaders committed to advocating for fair trade practices, supporting distributors, and strengthening the traditional trade ecosystem in Uttar Pradesh. Our leadership team ensures that the voices of distributors are heard at state and national levels, driving positive change in the industry.

                    </p>
                </div>

                {/* Executive Committee */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                        <Users className="h-6 w-6 mr-3 text-[#E71108]" />
                        Executive Committee
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <LeadershipCard
                            title="President"
                            name="[Name]"
                            role="Leads the strategic vision of UPFDA, represents distributors at state and national forums, and ensures alignment with AICPDF."
                            email="president@upfda.org"
                            icon={UserCircle}
                        />
                        <LeadershipCard
                            title="Senior Vice President"
                            name="[Name]"
                            role="Oversees district-level associations and supports inter-association collaboration. Assists the President in driving initiatives"
                            icon={Briefcase}
                        />
                        <LeadershipCard
                            title="Vice Presidents"
                            name="Western UP, Central UP, Eastern UP"
                            role="Focuses on regional representation, addressing specific trade concerns, and fostering relationships between local associations"
                            icon={Briefcase}
                        />
                        <LeadershipCard
                            title="General Secretary"
                            name="[Name]"
                            role="Manages operations, member communication, and coordination between UPFDA and local associations."
                            email="generalsecretary@upfda.org"
                            icon={Building2}
                        />
                        <LeadershipCard
                            title="Treasurer"
                            name="[Name]"
                            role="Manages financial planning, membership dues, and ensures transparency in financial matters."
                            email="treasurer@upfda.org"
                            icon={Building2}
                        />
                        <LeadershipCard
                            title="Executive Members"
                            name="[Name]"
                            role="Executive Members represent the voice of distributors across Uttar Pradesh, support the leadership team in decision-making, and drive the implementation of UPFDA initiatives at the grassroots level."
                            email="executive@upfda.org"
                            icon={Building2}
                        />
                    </div>
                </div>

                {/* Joint Secretaries */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900">Joint Secretaries</h2>
                    <p className=' mb-8'>Supports administrative functions and ensures smooth execution of UPFDA activities. Assists the General Secretary and Vice Presidents in driving initiatives.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <JointSecretarySection
                            title="Company Affairs"
                            description="Responsible for liaising with manufacturers and ensuring smooth communication between distributors and companies.Coordinates discussions around pricing, margins, and policy changes."
                            icon={Briefcase}
                            name="[Name]"
                        />
                        <JointSecretarySection
                            title="Media & Communications"
                            description="Oversees external communication, including press releases, media interactions, and digital outreach. Manages the federation’s social media channels, website updates, and public relations campaigns."
                            icon={Newspaper}
                            name="[Name]"
                        />
                        <JointSecretarySection
                            title="Member Relations"
                            description="Ensures active engagement with district and local associations. Handles membership drives, membership queries, grievances, and onboarding processes.
"
                            icon={UserPlus}
                            name="[Name]"
                        />
                        <JointSecretarySection
                            title="Training & Development"
                            description="Organizes workshops, seminars, and training sessions for distributors. Collaborates with external experts to provide skill development opportunities.
"
                            icon={GraduationCap}
                            name="[Name]"
                        />
                        <JointSecretarySection
                            title="Policy Advocacy"
                            description="Focuses on building strong relationships with policymakers and advocating for fair trade practices. Prepares reports and proposals to address systemic issues affecting distributors.
"
                            icon={ScrollText}
                            name="[Name]"
                        />
                        <JointSecretarySection
                            title="Legal Affairs"
                            description="Handles legal concerns of members and advises on compliance with laws and regulations. Advises on compliance with laws and regulations impacting the distribution industry.
"
                            icon={Gavel}
                            name="[Name]"
                        />
                        <JointSecretarySection
                            title="Finance & Revenue"
                            description="Assists the Treasurer in managing financial matters. Focuses on financial planning, fundraising, and ensuring efficient use of resources.
"
                            icon={Wallet}
                            name="[Name]"
                        />
                        <JointSecretarySection
                            title="IT & Digital Initiatives"
                            description="Promotes the use of technology in distribution and supply chain operations. Oversees digital transformation initiatives and online member services.    "
                            icon={Laptop}
                            name="[Name]"
                        />
                        <JointSecretarySection
                            title="Event Coordination"
                            description="Plans and executes events such as meetings, conferences, and awareness campaigns. Ensures smooth logistical arrangements for UPFDA activities.
"
                            icon={Calendar}
                            name="[Name]"
                        />
                    </div>
                </div>

                {/* Advisory Council */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                        <GraduationCap className="h-6 w-6 mr-3 text-[#E71108]" />
                        Advisory Council
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <p className="text-gray-600 mb-6">
                            The Advisory Council comprises senior members and industry experts who provide strategic guidance to UPFDA and ensure the federation remains aligned with its mission and vision.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <LeadershipCard
                                title="Advisor"
                                name="[Name]"
                                role="Senior Industry Expert"
                                icon={UserCircle}
                            />
                            <LeadershipCard
                                title="Advisor"
                                name="[Name]"
                                role="Senior Industry Expert"
                                icon={UserCircle}
                            />
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                {/* <div className="text-center">
                    <p className="text-lg text-gray-600 mb-6">
                        Connect with our leadership team to learn more about UPFDA's initiatives and how you can get involved.
                    </p>
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#E71108] hover:bg-[#ff2a23] transition-colors">
                        Contact Leadership Team
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Leadership;