import React from 'react';
import { Newspaper, FileText, BookOpen, ArrowRight } from 'lucide-react';

const Resources = () => {
  return (
    <div className="min-h-screen bg-[#F1D5DE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resources</h1>
          <div className="w-24 h-1 bg-[#E71108] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access valuable resources to help you grow and manage your business effectively
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Industry Updates Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {/* <div className="p-1 bg-gradient-to-r from-[#D72826] to-[#F1D5DE]"></div> */}
            <div className="p-1 bg-gradient-to-r from-[#E71108] to-[#ffb5b3]"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Newspaper className="w-6 h-6 text-[#E71108]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 ml-3">Industry Updates</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Stay informed with the latest news and trends in FMCG distribution, policy changes, and market opportunities.
              </p>
              <button className="flex items-center text-[#E71108] hover:text-[#E71108] transition-colors">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Policy Documents Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="p-1 bg-gradient-to-r from-[#E71108] to-[#ffb5b3]"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-[#E71108]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 ml-3">Policy Documents</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Access important guidelines, legal resources, and documentation to help you navigate industry challenges.
              </p>
              <button className="flex items-center text-[#E71108] hover:text-[#E71108] transition-colors">
                View Documents <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Training Materials Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="p-1 bg-gradient-to-r from-[#E71108] to-[#ffb5b3]"></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BookOpen className="w-6 h-6 text-[#E71108]" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 ml-3">Training Materials</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Download guides and presentations from our workshops and seminars to enhance your skills and business operations.
              </p>
              <button className="flex items-center text-[#E71108] hover:text-[#E71108] transition-colors">
                Access Materials <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources; 