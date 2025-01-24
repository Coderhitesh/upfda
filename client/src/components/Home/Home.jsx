"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Info, UserPlus, ChevronRight, Award, Clock, Building2, Store, ShoppingBag, Globe, Users, Package, Archive, Star, Quote, MapPin, Phone, Mail, Send } from 'lucide-react';
import Link from "next/link";

const Counter = ({ end, duration, label, icon: Icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#FFF1E8] rounded-full">
                <Icon className="w-8 h-8 text-[#E71108]" />
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#E71108]">{count}</span>
                    <span className="text-4xl font-bold text-[#E71108]">+</span>
                </div>
                <p className="mt-2 text-gray-600 font-medium">{label}</p>
            </div>
        </div>
    );
};

const Home = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
    };

    const stats = [
        { icon: Users, count: 5000, label: "Satisfied Customers", duration: 2000 },
        { icon: Award, count: 150, label: "Team Members", duration: 1500 },
        { icon: Package, count: 1000, label: "Products", duration: 1800 },
        { icon: Clock, count: 25, label: "Years Experience", duration: 1200 },
        { icon: Archive, count: 10000, label: "Stock Keeping Units", duration: 2200 }
    ];

    const testimonials = [
        {
            name: "Rajesh Kumar",
            position: "Retail Chain Owner",
            company: "Kumar Enterprises",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            review: "UPFDA has been instrumental in streamlining our distribution network. Their commitment to quality service and timely delivery has significantly improved our business operations."
        },
        {
            name: "Priya Sharma",
            position: "Operations Director",
            company: "Metro Mart",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            review: "Working with UPFDA has been a game-changer for our retail chain. Their professional approach and extensive network have helped us expand our reach across Uttar Pradesh."
        },
        {
            name: "Amit Patel",
            position: "General Manager",
            company: "Foodland Supermarkets",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
            review: "The support and guidance from UPFDA have been exceptional. They understand the market dynamics and provide valuable insights for business growth."
        },
        {
            name: "Meera Agarwal",
            position: "Supply Chain Head",
            company: "Quick Retail Solutions",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
            review: "UPFDA's commitment to maintaining high standards in distribution has helped us deliver better value to our customers. Their team's expertise is truly commendable."
        }
    ];

    const settingstest = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <main>

            {/* hero section start  */}

            <section className="w-full">
                <div className="slider-container">
                    <Slider {...settings}>
                        <div className="relative hero_banner_height w-full">
                            <Image
                                src={"/banner5.jpg"}
                                alt="banner"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="relative w-full">
                            <Image
                                src={"/banner5.jpg"}
                                alt="banner2"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="relative w-full">
                            <Image
                                src={"/banner5.jpg"}
                                alt="banner3"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </Slider>
                </div>
            </section>

            {/* hero section end  */}

            <section className="w-full bg-[#e7bca2] py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-black">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
                        Welcome to UPFDA
                    </h1>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-10">
                        <p className="text-lg leading-relaxed mb-6">
                            Uttar Pradesh Federation of Distributor Associations (UPFDA) is the official state-level federation representing the interests of FMCG distributors across Uttar Pradesh. As an umbrella organization affiliated with the All India Consumer Products Distributors Federation (AICPDF), we provide a unified voice for distributors and work collaboratively with district, city, and town-level associations to foster equitable and sustainable trade practices.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Through advocacy, capacity building, and active representation, UPFDA ensures fair policies, efficient supply chains, and professional growth for its members.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={'/about/up/new'} className="flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors group">
                            <Info size={20} />
                            Learn More About Us
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>

                        <Link href={'/membership'} className="flex items-center justify-center gap-2 bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors group">
                            <UserPlus size={20} />
                            Become a Member
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Quality Services Box */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-[#FFF1E8] rounded-full mb-6">
                                <Award className="w-8 h-8 text-[#E71108]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Services</h3>
                            <p className="text-gray-600">
                                Delivering exceptional quality solutions that exceed customer expectations consistently.
                            </p>
                        </div>

                        {/* Strong Customer Focus Box */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-[#FFF1E8] rounded-full mb-6">
                                <Users className="w-8 h-8 text-[#E71108]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Strong Customer Focus</h3>
                            <p className="text-gray-600">
                                Prioritizing customer needs and delivering personalized solutions for lasting relationships.
                            </p>
                        </div>

                        {/* On Time Delivery Box */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-[#FFF1E8] rounded-full mb-6">
                                <Clock className="w-8 h-8 text-[#E71108]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">On Time Delivery</h3>
                            <p className="text-gray-600">
                                Meeting deadlines consistently with efficient planning and reliable execution.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-[#fff1e8]">
                {/* <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Sectors</h2>
                        <div className="w-24 h-1 bg-[#E71108] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* INSTITUTIONS Box */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src=""
                                    alt="Institutions"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute top-4 left-4 bg-[#E71108] p-2 rounded-full">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">INSTITUTIONS</h3>
                                <p className="text-gray-600">Providing comprehensive distribution solutions for educational and healthcare institutions.</p>
                            </div>
                        </div>

                        {/* HORECA Box */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000"
                                    alt="HORECA"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute top-4 left-4 bg-[#E71108] p-2 rounded-full">
                                    <Store className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">HORECA</h3>
                                <p className="text-gray-600">Specialized distribution services for hotels, restaurants, and catering businesses.</p>
                            </div>
                        </div>

                        {/* GENERAL TRADE Box */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1000"
                                    alt="General Trade"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute top-4 left-4 bg-[#E71108] p-2 rounded-full">
                                    <ShoppingBag className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">GENERAL TRADE (GT)</h3>
                                <p className="text-gray-600">Supporting retail stores and traditional trade channels with efficient distribution.</p>
                            </div>
                        </div>

                        {/* E-COMMERCE Box */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1000"
                                    alt="E-Commerce"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute top-4 left-4 bg-[#E71108] p-2 rounded-full">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">E-COMMERCE</h3>
                                <p className="text-gray-600">Digital distribution solutions for online marketplaces and e-commerce platforms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Legacy in Numbers</h2>
                        <div className="w-24 h-1 bg-[#E71108] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {stats.map((stat, index) => (
                            <Counter
                                key={index}
                                icon={stat.icon}
                                end={stat.count}
                                label={stat.label}
                                duration={stat.duration}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-[#FFF1E8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                        <div className="w-24 h-1 bg-[#E71108] mx-auto rounded-full mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover why businesses across Uttar Pradesh trust UPFDA for their distribution needs
                        </p>
                    </div>

                    <div className="testimonials-slider">
                        <Slider {...settingstest}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="px-4 py-2">
                                    <div className="bg-white rounded-2xl shadow-sm p-8 h-full relative">
                                        <div className="absolute top-6 right-8 text-[#FFF1E8]">
                                            <Quote size={48} />
                                        </div>

                                        <div className="flex items-center mb-6">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-16 h-16 rounded-full object-cover mr-4"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                                                <p className="text-gray-600">{testimonial.position}</p>
                                                <p className="text-[#E71108] text-sm">{testimonial.company}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex text-yellow-400 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={16} fill="currentColor" />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 italic relative z-10">"{testimonial.review}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                        <div className="w-24 h-1 bg-[#E71108] mx-auto rounded-full mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    {/* Contact Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-[#FFF1E8] rounded-lg">
                                            <MapPin className="w-6 h-6 text-[#E71108]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Our Location</h4>
                                        <p className="mt-1 text-gray-600">
                                            123 Distribution Hub, Sector 18<br />
                                            Lucknow, Uttar Pradesh 226001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-[#FFF1E8] rounded-lg">
                                            <Phone className="w-6 h-6 text-[#E71108]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Phone Number</h4>
                                        <p className="mt-1 text-gray-600">+91 522 2345 6789</p>
                                        <p className="text-gray-600">+91 522 9876 5432</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-[#FFF1E8] rounded-lg">
                                            <Mail className="w-6 h-6 text-[#E71108]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Email Address</h4>
                                        <p className="mt-1 text-gray-600">info@upfda.org</p>
                                        <p className="text-gray-600">support@upfda.org</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-[#FFF1E8] rounded-lg">
                                            <Clock className="w-6 h-6 text-[#E71108]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Working Hours</h4>
                                        <p className="mt-1 text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Send us a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        placeholder="Your message..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#E71108] text-white py-3 px-6 rounded-lg hover:bg-[#ff130a] transition-colors duration-300 flex items-center justify-center space-x-2"
                                >
                                    <Send className="w-5 h-5" />
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                
            </section>

        </main>
    );
};

export default Home;
