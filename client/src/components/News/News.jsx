'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const News = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 3;

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('https://www.test.blueaceindia.com/api/v1/get_blogs');
            setBlogs(data.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to fetch blogs");
        }
    };

    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#f2d8a2] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest Blog Posts</h1>
                    <div className="w-24 h-1 bg-[#E71108] mx-auto rounded-full mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay updated with our latest blogs on various topics.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {currentBlogs.map((blog) => (
                        <Link 
                            href={`/news/${blog._id}`}
                            key={blog._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={blog.image.url}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-[#E71108] transition-colors">
                                    {blog.title}
                                </h2>
                                <p  dangerouslySetInnerHTML={{
                                            __html: blog.content.split(" ").slice(0, 8).join(" ") + (blog.content.split(" ").length > 8 ? "..." : ""),
                                        }} className="text-gray-600 mb-4 line-clamp-3">
                                    
                                </p>

                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {new Date(blog.createdAt).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#E71108] hover:bg-blue-50'}`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`w-10 h-10 rounded-lg ${currentPage === index + 1 ? 'bg-[#E71108] text-white' : 'text-gray-600 hover:bg-blue-50'} transition-colors duration-200`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#E71108] hover:bg-blue-50'}`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
