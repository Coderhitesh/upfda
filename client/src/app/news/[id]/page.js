"use client";

import React, { useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowLeft
} from 'lucide-react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const Page = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = React.useState({});
  
  // Fetch blog data from API
  const handleFetchBlog = async () => {
    try {
      const { data } = await axios.get(`https://www.api.upfda.in/api/v1/get_blog/${id}`);
      setBlogPost(data.data);
    } catch (error) {
      console.log("Internal server error", error);
    }
  };

  useEffect(() => {
    handleFetchBlog();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img src={blogPost.image?.url || '/default-image.jpg'} alt={blogPost.title} />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(blogPost.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {blogPost.readTime || 'Unknown'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Author Info */}
        <div className="flex items-center mb-8 p-6 bg-white rounded-xl shadow-lg">
          <div>
            <h3 className="font-semibold text-gray-900">{blogPost.author}</h3>
            <p className="text-gray-600 text-sm">{blogPost.authorRole || 'Author'}</p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none"
               dangerouslySetInnerHTML={{ __html: blogPost.content }}>
          </div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </button>
      </div>
    </div>
  );
};

export default Page;