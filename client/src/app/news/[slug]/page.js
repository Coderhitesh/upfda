"use client";

import React from 'react';
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  ArrowLeft
} from 'lucide-react';
import { useParams } from 'next/navigation';

const SingleBlog = () => {
  const { slug } = useParams();

  // This would normally come from an API based on the slug
  const blogPost = {
    title: "Latest Developments in FMCG Distribution",
    excerpt: "Exploring the newest trends and innovations in FMCG distribution channels and their impact on business growth.",
    content: `
      <p>The FMCG distribution landscape is rapidly evolving with new technologies and changing consumer behaviors. This comprehensive analysis explores the latest developments and their implications for businesses in the sector.</p>
      
      <h2>Digital Transformation</h2>
      <p>Digital transformation is revolutionizing how FMCG products are distributed and sold. From AI-powered inventory management to blockchain-based supply chain tracking, technology is creating new opportunities for efficiency and transparency.</p>
      
      <h2>Sustainable Practices</h2>
      <p>Sustainability has become a core focus for FMCG distribution. Companies are implementing eco-friendly packaging solutions and optimizing delivery routes to reduce their carbon footprint.</p>
      
      <h2>Last-Mile Innovation</h2>
      <p>The last-mile delivery segment is seeing significant innovation, with companies exploring autonomous delivery vehicles, drone delivery, and micro-fulfillment centers to improve efficiency and reduce costs.</p>
    `,
    author: "John Smith",
    authorRole: "Industry Analyst",
    date: "Nov 28, 2023",
    readTime: "5 min read",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={blogPost.image} 
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                <Tag className="w-4 h-4 mr-2" />
                {blogPost.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {blogPost.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {blogPost.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Author Info */}
        <div className="flex items-center mb-8 p-6 bg-white rounded-xl shadow-lg">
          <img 
            src={blogPost.authorImage} 
            alt={blogPost.author}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{blogPost.author}</h3>
            <p className="text-gray-600 text-sm">{blogPost.authorRole}</p>
          </div>
        </div>

        {/* Blog Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none"
               dangerouslySetInnerHTML={{ __html: blogPost.content }}>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Share2 className="w-5 h-5 mr-2" />
            Share this article
          </h3>
          <div className="flex space-x-4">
            <button className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
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

export default SingleBlog;