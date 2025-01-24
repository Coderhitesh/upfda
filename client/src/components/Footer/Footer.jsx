import React from 'react'
import { Home, Users, Building2, Lightbulb, UserPlus, Calendar, BookOpen, Mail, Newspaper, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const Footer = () => {
    const links = [
        { name: 'Home', icon: <Home size={18} /> },
        { name: 'About Us', icon: <Users size={18} /> },
        { name: 'Organization & Leadership', icon: <Building2 size={18} /> },
        { name: 'Initiatives', icon: <Lightbulb size={18} /> },
        { name: 'Membership', icon: <UserPlus size={18} /> },
        { name: 'Activities and Events', icon: <Calendar size={18} /> },
        { name: 'Resources', icon: <BookOpen size={18} /> },
        { name: 'Contact Us', icon: <Mail size={18} /> },
        { name: 'News Room', icon: <Newspaper size={18} /> }
    ]

    const socialLinks = [
        { icon: <Facebook size={20} />, label: 'Facebook' },
        { icon: <Twitter size={20} />, label: 'Twitter' },
        { icon: <Instagram size={20} />, label: 'Instagram' },
        { icon: <Linkedin size={20} />, label: 'LinkedIn' }
    ]

    return (
        <footer className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-16">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        {/* <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                            Your Logo
                        </h2> */}
                        <Image src="/logo-bg.png" alt="Your Logo" width={100} height={100} />
                        <p className="text-purple-100/80 leading-relaxed">
                            Empowering communities through innovation and collaboration. Building a better future together.
                        </p>
                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 text-purple-100 hover:text-white hover:scale-110"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href="#"
                                className="group flex items-center space-x-3 text-purple-100/80 hover:text-white"
                            >
                                <span className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                    {link.icon}
                                </span>
                                <span className="font-medium">{link.name}</span>
                                <ArrowUpRight
                                    size={14}
                                    className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-purple-100/60">
                            © {new Date().getFullYear()} UPFDA. All rights reserved.
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="#" className="text-sm text-purple-100/60 hover:text-white transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-purple-100/60 hover:text-white transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-sm text-purple-100/60 hover:text-white transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer