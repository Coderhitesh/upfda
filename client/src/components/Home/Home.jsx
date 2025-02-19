"use client";
import React, { useEffect, useState } from "react";
import { Info, UserPlus, ChevronRight, Clock, Building2, Store, ShoppingBag, Globe, Users, Package, Star, Quote, MapPin, Phone, Mail, Send, TruckIcon, Users2, Truck, UserCheck } from 'lucide-react';
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Banner from "../Banner/Banner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import media from '/media.jpg';

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
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#FFFDE0] rounded-full">
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

    const stats = [
        { icon: Users, count: 1500, label: "ASSOCIATIONS", duration: 2000 },
        { icon: Truck, count: 1000, label: "DISTRIBUTORS", duration: 1800 },
        { icon: Store, count: 25, label: "RETAILERS", duration: 1200 },
        { icon: Package, count: 10000, label: "BRANDS", duration: 2200 },
        { icon: UserCheck, count: 150, label: "TEAM MEMBERS", duration: 1500 },
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

    // contact for submit here 

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://www.api.upfda.in/api/v1/create_inquiry', formData)
            toast.success(res.data.message || 'Inquiry sent successfully');
        } catch (error) {
            console.log("Internal server error", error);
            toast.error(error?.response?.data?.message || 'Something went wrong');
        }
    };

    // contact section end here 



    return (
        <main>
            <Banner />
            {/* hero section end  */}

            <section className="w-full bg-[#ffdda6] py-20 px-4 sm:px-6 lg:px-8">
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
                        <Link href={'/about'} className="flex items-center justify-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors group">
                            <Info size={20} />
                            Learn More About Us
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>

                        <Link href={'/register'} className="flex items-center justify-center gap-2 bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors group">
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
                        {/* Distributor Association Box */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-[#FFFDE0] rounded-full mb-6">
                                <Users2 className="w-8 h-8 text-[#E71108]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Distributor Association</h3>
                            <p className="text-gray-600">
                                Exclusive membership benefits including industry insights, networking opportunities, and growth resources.
                            </p>
                        </div>

                        {/* Distributor Box */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-[#FFFDE0] rounded-full mb-6">
                                <TruckIcon className="w-8 h-8 text-[#E71108]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Distributor</h3>
                            <p className="text-gray-600">
                                Extensive network of certified distributors ensuring reliable product delivery across regions.
                            </p>
                        </div>

                        {/* Retailer Box */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-center w-16 h-16 bg-[#FFFDE0] rounded-full mb-6">
                                <Store className="w-8 h-8 text-[#E71108]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Retailer</h3>
                            <p className="text-gray-600">
                                Comprehensive support system for retailers including training, marketing, and inventory management.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-[#fffde0]">
                {/* <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100"> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Sectors</h2>
                        <div className="w-24 h-1 bg-[#E71108] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brands Box */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=1000"
                                    alt="Brands"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute top-4 left-4 bg-[#E71108] p-2 rounded-full">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">BRANDS</h3>
                                <p className="text-gray-600">Providing comprehensive distribution solutions for leading brands across industries.</p>
                            </div>
                        </div>

                        {/* Policymaker Box */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="/policymaker.jpg"
                                    alt="Policymaker"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute top-4 left-4 bg-[#E71108] p-2 rounded-full">
                                    <Store className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">POLICYMAKER</h3>
                                <p className="text-gray-600">Supporting policymakers with strategic insights and regulatory guidance.</p>
                            </div>
                        </div>

                        {/* Investment Firms Box */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1000"
                                    alt="Investment Firms"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute top-4 left-4 bg-[#E71108] p-2 rounded-full">
                                    <ShoppingBag className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">INVESTMENT FIRMS</h3>
                                <p className="text-gray-600">Providing financial strategies and distribution opportunities for investment firms.</p>
                            </div>
                        </div>

                        {/* Media Box */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src="/media.jpg"
                                    alt="Media"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute top-4 left-4 bg-[#E71108] p-2 rounded-full">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">MEDIA</h3>
                                <p className="text-gray-600">Empowering media houses with insights, branding, and strategic partnerships.</p>
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

            <section className="py-16 bg-[#fffde0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimonials</h2>
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
                                        <div className="absolute top-6 right-8 text-[#FFFDE0]">
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
                                        <div className="flex items-center justify-center w-12 h-12 bg-[#FFFDE0] rounded-lg">
                                            <MapPin className="w-6 h-6 text-[#E71108]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Our Location</h4>
                                        <p className="mt-1 text-gray-600">
                                            034C, Tugalpur  Phase III, Beside Gurdwara, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh - 201306
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-[#FFFDE0] rounded-lg">
                                            <Phone className="w-6 h-6 text-[#E71108]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Phone Number</h4>
                                        <p className="mt-1 text-gray-600">+91 9821480775</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-[#FFFDE0] rounded-lg">
                                            <Mail className="w-6 h-6 text-[#E71108]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Email Address</h4>
                                        <p className="mt-1 text-gray-600">contact@upfda.in</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 bg-[#FFFDE0] rounded-lg">
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
                                            onChange={handleChange}
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
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone No.
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="+91 1234567890"
                                        required
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
