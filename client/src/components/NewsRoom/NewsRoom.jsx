'use client'
import axios from 'axios';
import { Newspaper, ExternalLink, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';

const NewsRoom = () => {
  const [allNews, setAllNews] = useState([]);
  const handleFetch = async () => {
    try {
      const { data } = await axios.get('https://www.api.upfda.in/api/v1/get_news');
      const reversedData = data.data.reverse();
      setAllNews(reversedData);
    } catch (error) {
      console.log("Internal server error", error);
    }
  }
  useEffect(() => {
    handleFetch();
  })
  return (
    <div className="min-h-screen bg-[#F2D8A2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Main Article */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Should There Be A Health Tax On Packaged Foods? | The Big Question
            </h1> */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                AICPDF Joins National Discussion on Proposed Health Tax on Ultra-Processed & Packaged Foods
              </h2>
              <p className="text-gray-600 mb-6">
                The Economic Survey 2025 has proposed a health tax on ultra-processed and packaged foods to address India's growing health concerns. The initiative aims to curb unhealthy eating habits and promote better nutrition nationwide.
              </p>
              <p className="text-gray-600">
                Recognizing the impact of this proposal on the FMCG distribution sector, AICPDF National President Sh. Dhairyashil Patil was invited to participate in the discussion. Representing the voice of distributors and retailers, he emphasized the need for a balanced approach that considers both public health and the interests of stakeholders in the supply chain.
              </p>
            </div>
          </div>

          {/* News Links */}
          <div className="grid gap-6 md:grid-cols-2">
            {
              allNews && allNews.map((item, index) => (
                <a
                key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 flex items-start gap-4"
                >
                  <Newspaper className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                </a>
              ))
            }
          </div>

          {/* YouTube Video */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Youtube className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-gray-900">Featured Video</h3>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[500px] rounded-lg"
                src="https://www.youtube.com/embed/NHI_uiZQl9I"
                title="AICPDF Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsRoom;