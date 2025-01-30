'use client';

import React from 'react';
import {
  Users,
  Shield,
  Network,
  BookOpen,
  ArrowRight,
  Building,
  Handshake,
  GraduationCap,
  Scale
} from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-[#E71108]" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="relative flex items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#E71108] font-bold text-xl flex-shrink-0">
      {number}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Membership = () => {
  const benefits = [
    {
      icon: Network,
      title: "Network Access",
      description: "Connect with a vast network of distributors across Uttar Pradesh and beyond."
    },
    {
      icon: Shield,
      title: "Business Protection",
      description: "Get support in resolving disputes and advocating for fair policies."
    },
    {
      icon: GraduationCap,
      title: "Training Programs",
      description: "Access exclusive training programs and professional development resources."
    },
    {
      icon: Scale,
      title: "Policy Advocacy",
      description: "Strong representation at state and national levels for your interests."
    },
    {
      icon: Handshake,
      title: "Industry Connections",
      description: "Network with industry leaders and peers at exclusive events."
    },
    {
      icon: BookOpen,
      title: "Knowledge Resources",
      description: "Access to industry insights, best practices, and market trends."
    }
  ];

  return (
    // <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
    <div className="min-h-screen bg-[#F1D5DE] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <Users className="h-8 w-8 text-[#E71108]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Join UPFDA</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Become part of Uttar Pradesh's largest network of FMCG distributors. Together, we're stronger.
          </p>
        </div>

        {/* Why Join Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join UPFDA?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Membership with UPFDA connects you to a larger network of distributors across Uttar Pradesh and beyond. As a member, you gain access to resources, representation, and opportunities to grow and protect your business.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Membership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>

        {/* How to Join Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Join</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              number="1"
              title="Submit Application"
              description="Fill out our online membership form with your business details."
            />
            <StepCard
              number="2"
              title="Documentation"
              description="Provide necessary business documents and references."
            />
            <StepCard
              number="3"
              title="Welcome Aboard"
              description="Get approved and start enjoying member benefits."
            />
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="bg-blue-50 rounded-xl p-8 inline-block">
            <Building className="h-12 w-12 text-[#E71108] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Join UPFDA today and become part of a community dedicated to strengthening the distribution network in Uttar Pradesh.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#E71108] hover:bg-[#ff4640] transition-colors">
              Apply for Membership <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Membership;