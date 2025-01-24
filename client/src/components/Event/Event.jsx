import React from 'react';
import { Calendar, Clock, History, Activity } from 'lucide-react';

const Event = () => {
  return (
    <div className="min-h-screen bg-[#F1D5DE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Activities and Events</h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Ongoing Activities Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <Activity className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-2xl font-semibold text-secondary">Ongoing Activities</h2>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <p className="text-gray-700 leading-relaxed">
              UPFDA continues to actively represent distributors in key discussions with manufacturers 
              and policymakers. Current initiatives include advocating for margin revisions and 
              addressing systemic issues affecting the distribution ecosystem.
            </p>
          </div>
        </div>

        {/* Past Events Section */}
        <div>
          <div className="flex items-center mb-6">
            <History className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-2xl font-semibold text-secondary">Past Events</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Event Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold text-lg">District-level Meetings</h3>
              </div>
              <p className="text-gray-600">
                Organizing district-level distributor meetings to address trade concerns.
              </p>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold text-lg">AICPDF Campaign</h3>
              </div>
              <p className="text-gray-600">
                Participating in the AICPDF's 'Hum Hai, Hum Rahenge' campaign.
              </p>
            </div>

            {/* Event Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold text-lg">Training Workshops</h3>
              </div>
              <p className="text-gray-600">
                Hosting training workshops on operational excellence and dispute resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;