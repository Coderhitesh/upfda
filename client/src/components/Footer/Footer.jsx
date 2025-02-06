import React from 'react';
import { 
    Phone, 
    Mail, 
    MapPin, 
    Clock, 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin,
    ChevronRight,
    Youtube
} from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
    const quickLinks = [
        { name: 'Home' },
        { name: 'About Us' },
        { name: 'Organization & Leadership' },
        { name: 'Initiatives' },
        { name: 'Membership' }
    ];

    const otherLinks = [
        { name: 'Activities and Events' },
        { name: 'Resources' },
        { name: 'Contact Us' },
        { name: 'News Room' },
        { name: 'Privacy Policy' }
    ];

    const socialLinks = [
        { icon: <Facebook size={20} />, label: 'Facebook', href: 'https://www.facebook.com/UPFDA/' },
        { icon: <Twitter size={20} />, label: 'Twitter', href: 'https://x.com/upfda_official' },
        { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://www.instagram.com/upfda_official/' },
        { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sumit-aggarwal-73a607349/' },
        { icon: <Youtube size={20} />, label: 'Youtube', href: 'https://www.youtube.com/@upfdaofficial' }
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info Column */}
                    <div className="space-y-6">
                        <Image 
                            src="/logo-bg.png" 
                            alt="UPFDA Logo" 
                            width={120} 
                            height={120} 
                            className="mb-4"
                        />
                        <p className="text-sm leading-relaxed text-gray-400">
                            UPFDA is dedicated to promoting excellence in pest management 
                            and fostering collaboration among industry professionals to 
                            create safer, healthier environments.
                        </p>
                        <div className="flex space-x-3 pt-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-gray-400 hover:text-white"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href="#" 
                                        className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Other Links Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Other Links</h3>
                        <ul className="space-y-3">
                            {otherLinks.map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href="#" 
                                        className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-6">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                <p className="text-sm text-gray-400">
                                034C, Tugalpur Phase III, Beside Gurdwara, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh - 201306
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-gray-400" />
                                <a 
                                    href="tel:+919821480775" 
                                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                    +91 9821480775
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <a 
                                    href="mailto:media@upfda.in" 
                                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                    media@upfda.in
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <p className="text-sm text-gray-400">
                                    Mon - Fri: 9:00 AM - 6:00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-400">
                            © {new Date().getFullYear()} UPFDA. All rights reserved.
                        </div>
                        {/* <div className="flex flex-wrap justify-center gap-8">
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;