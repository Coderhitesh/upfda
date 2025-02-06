'use client';

import React from 'react';
import { Users, Target, Link as LinkIcon } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#f2d8a2] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About UPFDA</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unifying FMCG distributors across Uttar Pradesh to build a stronger, more collaborative future.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Who We Are Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-[#E71108]" />
              <h2 className="text-2xl font-bold text-gray-900 ml-3">Who We Are</h2>
            </div>
            <p className="text-gray-600 mb-4">
              UPFDA is the apex body representing FMCG distributors in Uttar Pradesh. Our primary aim is to unify distributors under one umbrella to address industry challenges, advocate for fair trade policies, and foster innovation and professionalism in distribution.
            </p>
            <p className="text-gray-600">
              We work closely with district and local distributor associations, providing guidance, nurturing growth, and strengthening traditional trade at every level.
            </p>
          </div>

          {/* Mission and Vision Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-[#E71108]" />
              <h2 className="text-2xl font-bold text-gray-900 ml-3">Mission & Vision</h2>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E71108] mt-2 mr-2 flex-shrink-0"></span>
                  Advocate for fair margins and sustainable trade practices
                </li>
                <li className="flex items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E71108] mt-2 mr-2 flex-shrink-0"></span>
                  Represent distributors' interests in state and national forums
                </li>
                <li className="flex items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E71108] mt-2 mr-2 flex-shrink-0"></span>
                  Facilitate training and knowledge-sharing
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To empower every distributor in Uttar Pradesh by building a robust, collaborative, and equitable trade ecosystem.
              </p>
            </div>
          </div>

          {/* Affiliation Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <LinkIcon className="h-8 w-8 text-[#E71108]" />
              <h2 className="text-2xl font-bold text-gray-900 ml-3">Our Affiliation</h2>
            </div>
            <p className="text-gray-600">
              UPFDA is proud to be officially affiliated with the All India Consumer Products Distributors Federation (AICPDF), the premier national body representing state and regional distributor associations across India. Through this affiliation, UPFDA ensures that distributors in Uttar Pradesh have a voice in national-level discussions and decisions.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Join us in our mission to strengthen the distribution network across Uttar Pradesh.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#E71108] hover:bg-[#e9403a] transition-colors">
            Become a Member
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default About;