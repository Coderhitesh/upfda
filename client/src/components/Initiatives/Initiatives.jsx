'use client';

import React from 'react';
import {
  Scale,
  GraduationCap,
  Users,
  ScrollText,
  ArrowRight,
  CheckCircle2,
  Target,
  Handshake,
  BookOpen
} from 'lucide-react';

const InitiativeCard = ({ icon: Icon, title, description, items = [] }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-all duration-300">
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
        <Icon className="h-6 w-6 text-[#E71108]" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 ml-4">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6">{description}</p>
    {items.length > 0 && (
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const Initiatives = () => {
  const initiatives = [
    {
      icon: Scale,
      title: "Advocacy for Fair Trade Practices",
      description: "UPFDA actively engages with policymakers, manufacturers, and trade organizations to secure equitable treatment for distributors, ensuring sustainable margins, transparent practices, and a healthy business environment.",
      // items: [
      //   "Regular dialogue with manufacturers on margin structures",
      //   "Representation in industry forums and government committees",
      //   "Campaign for transparent trade policies",
      //   "Protection of distributor interests in policy decisions"
      // ]
    },
    {
      icon: GraduationCap,
      title: "Capacity Building and Training",
      description: "We organize training programs and workshops to help distributors adopt best practices in operations, inventory management, and customer relations, promoting professionalism and efficiency.",
      // items: [
      //   "Digital transformation workshops",
      //   "Inventory management best practices",
      //   "Customer relationship management training",
      //   "Financial management seminars"
      // ]
    },
    {
      icon: Users,
      title: "Collaborative Activities",
      description: "UPFDA has undertaken several impactful campaigns, including its participation in AICPDF's 'Hum Hai, Hum Rahenge' initiative, focusing on equitable trade practices and fair margins.",
      // items: [
      //   "Inter-association knowledge sharing programs",
      //   "Joint industry initiatives with AICPDF",
      //   "'Hum Hai, Hum Rahenge' campaign participation",
      //   "Regional distributor meetups"
      // ]
    },
    {
      icon: ScrollText,
      title: "Policy Recommendations",
      description: "UPFDA actively works with AICPDF and other stakeholders to recommend changes that benefit traditional trade, including equitable margins and efficient supply chain processes.",
      // items: [
      //   "Supply chain optimization proposals",
      //   "Fair margin structure recommendations",
      //   "Trade policy reform suggestions",
      //   "Digital adoption framework development"
      // ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f2d8a2] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <Target className="h-8 w-8 text-[#E71108]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Initiatives</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Driving positive change through strategic initiatives that empower distributors and strengthen the FMCG distribution ecosystem in Uttar Pradesh.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {initiatives.map((initiative, index) => (
            <InitiativeCard key={index} {...initiative} />
          ))}
        </div>

        {/* Ongoing Projects Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <div className="flex items-center mb-8">
            <Handshake className="h-8 w-8 text-[#E71108] mr-4" />
            <h2 className="text-2xl font-bold text-gray-900">Ongoing Campaign & Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project {index + 1}</h3>
                <p className="text-gray-600 text-sm mb-4">Details about ongoing projects and initiatives will be updated regularly.</p>
                <button className="text-[#E71108] hover:text-[#E71108] inline-flex items-center text-sm font-medium">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <BookOpen className="h-6 w-6 text-[#E71108] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Get Involved</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in our mission to transform the distribution landscape in Uttar Pradesh. Together, we can create a more equitable and efficient trade ecosystem.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#E71108] hover:bg-[#fd4842] transition-colors">
            Participate in Our Initiatives
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Initiatives;