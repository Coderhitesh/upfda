"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, Facebook, Instagram, Linkedin, ChevronDown, MessageSquarePlus, Youtube, Twitter, LogIn, User } from "lucide-react";
import Image from "next/image";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    // const token = sessionStorage.getItem('token');
    const [token,setToken] = useState(null)
    useEffect(() => {
            if (typeof window !== "undefined") {
                const distributor = sessionStorage.getItem('token');
                setToken(distributor)
            }
        }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, []);

    const navigation = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Organization", href: "/leadership" },
        { name: "Activities", href: "/activities-events" },
        // {
        //     name: "About Us",
        //     href: "/about",
        //     dropdown: [
        //         { name: "Organization & Leadership", href: "/leadership" },
        //         { name: "Activities and Events", href: "/activities-events" }
        //     ]
        // },
        { name: "Initiatives", href: "/initiatives" },
        { name: "Membership", href: "/membership" },
        { name: "Resources", href: "/resources" },
        { name: "Contact Us", href: "/contact" },
        { name: "News Room", href: "/news" },
    ];

    return (
        <header className="relative bg-white shadow-md">
            {/* Top Bar */}
            {/* <div className="w-full bg-gradient-to-r from-red-400 to-red-300 py-2 px-4 md:px-20"> */}
            <div className="w-full bg-[#192130] py-2 px-4 md:px-20">
                <div className="max-w-[1500px] mx-auto flex justify-between items-center">
                    <div className="flex gap-4  md:flex-row items-center justify-center md:justify-start w-full md:items-center">
                        <a href="tel:+919821480775" className="flex items-center space-x-2 text-white font-medium transition-colors duration-200">
                            <Phone className="h-4 w-4" />
                            <span>+91 9821480775</span>
                        </a>
                        <span className="hidden md:block text-white">|</span>
                        <a href="mailto:contact@upfda.in" className="flex items-center space-x-2 text-white font-medium transition-colors duration-200">
                            <Mail className="h-4 w-4" />
                            <span>contact@upfda.in</span>
                        </a>
                    </div>
                    <div className="hidden md:flex gap-3">
                        <a className="rounded-full p-2 text-white bg-[#0866FF] hover:bg-[#0756d3] transition-colors duration-200" target="_blank" href="https://www.facebook.com/UPFDA/">
                            <Facebook className="h-4 w-4" />
                        </a>
                        <a className="rounded-full p-2 text-white bg-[#d62976] hover:bg-[#b32160] transition-colors duration-200" target="_blank" href="https://www.instagram.com/upfda_official/">
                            <Instagram className="h-4 w-4" />
                        </a>
                        <a className="rounded-full p-2 text-white bg-[#0077B5] hover:bg-[#005f93] transition-colors duration-200" target="_blank" href="https://www.linkedin.com/in/sumit-aggarwal-73a607349/">
                            <Linkedin className="h-4 w-4" />
                        </a>
                        <a className="rounded-full p-2 text-white bg-[#FF0000] hover:bg-[#FF0000] transition-colors duration-200" target="_blank" href="https://www.youtube.com/@upfdaofficial">
                            <Youtube className="h-4 w-4" />
                        </a>
                        <a className="rounded-full p-2 text-white bg-[#1DA1F2] hover:bg-[#1DA1F2] transition-colors duration-200" target="_blank" href="https://x.com/upfda_official">
                            <Twitter className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
                <div className="flex py-1 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                width={100}
                                height={100}
                                src="/logo.jpg"
                                alt="Logo"
                                priority
                                layout="intrinsic"
                                style={{ height: "90px", width: "110px" }}
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex lg:items-center lg:space-x-6">
                        {navigation.map((item) => (
                            <div key={item.name} className="relative group">
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center px-1 py-2 text-sm font-medium text-gray-700 hover:text-[#E80F09] transition-colors duration-200"
                                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    {item.name}
                                    {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                                </Link>

                                {item.dropdown && activeDropdown === item.name && (
                                    <div
                                        className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                        onMouseEnter={() => setActiveDropdown(item.name)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <div className="py-1">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E80F09]"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Inquiry Now Button */}
                        {/* <div className="relative">
                            <button
                                onClick={() => setActiveDropdown((prev) => (prev === "inquiry" ? null : "inquiry"))}
                                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#E80F09] hover:bg-red-700 transition-colors duration-200"
                            >
                                <MessageSquarePlus className="mr-2 h-4 w-4" />
                                Become a Member
                            </button>
                            {activeDropdown === "inquiry" && (
                                <div
                                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                    onMouseLeave={() => setActiveDropdown(null)} // Close on hover-out
                                >
                                    <div className="py-1">
                                        <Link
                                            href="/distributor-inquiry"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E80F09]"
                                        >
                                            Become a Distributor
                                        </Link>
                                        <Link
                                            href="/retailer-inquiry"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E80F09]"
                                        >
                                            Become a Retailer
                                        </Link>
                                        <Link
                                            href="/dealer-inquiry"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E80F09]"
                                        >
                                            Become a Dealer
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div> */}

                        {
                            token ? (
                                <Link href={'/profile'}
                                    // onClick={() => setActiveDropdown((prev) => (prev === "inquiry" ? null : "inquiry"))}
                                    className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#E80F09] hover:bg-red-700 transition-colors duration-200"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Link>
                            ) : (
                                <Link href={'/login'}
                                    // onClick={() => setActiveDropdown((prev) => (prev === "inquiry" ? null : "inquiry"))}
                                    className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#E80F09] hover:bg-red-700 transition-colors duration-200"
                                >
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Login
                                </Link>
                            )
                        }
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden">
                        {
                            token ? (
                                <Link href={'/profile'}>
                                    <User className="mr-2 h-5 w-5" />
                                </Link>
                            ) : (
                                <Link href={'/login'}>
                                    <LogIn className="mr-2 h-5 w-5" />
                                </Link>
                            )
                        }
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
                <div className="space-y-1 pb-3 pt-2 px-4">
                    {navigation.map((item) => (
                        <div key={item.name}>
                            <Link
                                href={item.href}
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-700 hover:border-red-500 hover:bg-gray-50 hover:text-red-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                            {item.dropdown && (
                                <div className="pl-6">
                                    {item.dropdown.map((subItem) => (
                                        <Link
                                            key={subItem.name}
                                            href={subItem.href}
                                            className="block py-2 pl-3 pr-4 text-sm text-gray-600 hover:text-red-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Mobile Inquiry Button */}
                    {/* Mobile Inquiry Button */}
                    {/* <div className="relative">
                        <button
                            onClick={() => setActiveDropdown((prev) => (prev === "mobile-inquiry" ? null : "mobile-inquiry"))}
                            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#E80F09] hover:bg-red-700"
                        >
                            <MessageSquarePlus className="mr-2 h-5 w-5" />
                            Inquiry Now
                        </button>
                        {activeDropdown === "mobile-inquiry" && (
                            <div
                                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                onMouseLeave={() => setActiveDropdown(null)} // Close on hover-out
                            >
                                <div className="py-1">
                                    <Link
                                        href="/distributor-inquiry"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E80F09]"
                                    >
                                        Become a Distributor
                                    </Link>
                                    <Link
                                        href="/retailer-inquiry"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E80F09]"
                                    >
                                        Become a Retailer
                                    </Link>
                                    <Link
                                        href="/manufacturer-inquiry"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E80F09]"
                                    >
                                        Become a Dealer
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div> */}

                </div>
            </div>
        </header>
    );
};

export default Header;