'use client'

import React, { useState } from 'react';
import { Calendar, User, ChevronLeft, ChevronRight, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

const News = () => {
    // Sample blog data - in a real app, this would come from an API
    const allBlogs = [
        {
            id: 1,
            title: "Latest Developments in FMCG Distribution",
            excerpt: "Exploring the newest trends and innovations in FMCG distribution channels and their impact on business growth.",
            author: "John Smith",
            date: "Nov 28, 2023",
            readTime: "5 min read",
            category: "Industry Trends",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 2,
            title: "Supply Chain Optimization Strategies",
            excerpt: "Learn about cutting-edge strategies to optimize your supply chain and improve operational efficiency.",
            author: "Sarah Johnson",
            date: "Nov 25, 2023",
            readTime: "4 min read",
            category: "Operations",
            image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 3,
            title: "Digital Transformation in Distribution",
            excerpt: "How digital technologies are reshaping the distribution landscape and creating new opportunities.",
            author: "Mike Wilson",
            date: "Nov 23, 2023",
            readTime: "6 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 4,
            title: "Sustainable Distribution Practices",
            excerpt: "Implementing eco-friendly practices in distribution networks while maintaining efficiency.",
            author: "Emma Davis",
            date: "Nov 20, 2023",
            readTime: "4 min read",
            category: "Sustainability",
            image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 5,
            title: "Market Analysis Report 2023",
            excerpt: "Comprehensive analysis of market trends and predictions for the coming year.",
            author: "Alex Thompson",
            date: "Nov 18, 2023",
            readTime: "7 min read",
            category: "Market Analysis",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 6,
            title: "Regulatory Changes Impact",
            excerpt: "Understanding how recent regulatory changes affect distribution businesses.",
            author: "Lisa Brown",
            date: "Nov 15, 2023",
            readTime: "5 min read",
            category: "Regulations",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000"
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 3;
    const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

    // Get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen bg-[#F1D5DE] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest News & Updates</h1>
                    <div className="w-24 h-1 bg-[#E71108] mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay informed with our latest news, insights, and updates from the industry
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {currentBlogs.map((blog) => (
                        <Link 
                        href={`/news/${blog.title}`}
                            key={blog.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-[#E71108] text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-[#E71108] transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {blog.excerpt}
                                </p>

                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-1" />
                                        {blog.author}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {blog.date}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {blog.readTime}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg ${currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-[#E71108] hover:bg-blue-50'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-10 h-10 rounded-lg ${currentPage === index + 1
                                    ? 'bg-[#E71108] text-white'
                                    : 'text-gray-600 hover:bg-blue-50'
                                } transition-colors duration-200`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg ${currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-[#E71108] hover:bg-blue-50'
                            }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default News;