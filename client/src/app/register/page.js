'use client'
import React, { useState } from 'react';
import { Store, Users, UserCircle } from 'lucide-react';
import Distributor from '@/components/RegisterPages/Distributor';
import Retailer from '@/components/RegisterPages/Retailer';
import Dealer from '@/components/RegisterPages/Dealer';

function App() {
    const [selectedOption, setSelectedOption] = useState('distributor');

    const options = [
        {
            id: 'distributor', label: 'Distributor', icon: Store,
            content: 'Manage large-scale distribution networks and supply chains efficiently.',
            componentPage: <Distributor />
        },
        {
            id: 'retailer', label: 'Retailer', icon: Users,
            content: 'Connect directly with customers and handle point-of-sale operations.',
            componentPage: <Retailer />
        },
        {
            id: 'dealer', label: 'Association', icon: UserCircle,
            content: 'Represent specific brands and provide specialized product knowledge.',
            componentPage: <Dealer />
        }
    ];

    return (
        <div className="min-h-screen py-16 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Select Your Business Type
                    </h1>

                    <div className="flex items-center justify-center gap-2">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="relative"
                            >
                                <input
                                    type="radio"
                                    id={option.id}
                                    name="business-type"
                                    value={option.id}
                                    className="peer hidden"
                                    checked={selectedOption === option.id}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                />
                                <label
                                    htmlFor={option.id}
                                    className="flex justify-between  items-center p-2 bg-white rounded-xl shadow-sm cursor-pointer
                    border-2 transition-all duration-200 ease-in-out
                    peer-checked:border-[#D70808] peer-checked:bg-blue-50
                    hover:bg-gray-50"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {option.label}
                                        </h3>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>

                </div>
                {selectedOption && (
                    <>
                        {options.find(opt => opt.id === selectedOption).componentPage}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;