"use client"
import React, { useState, useEffect } from 'react';
import {
    User, Building, MapPin, LogOut, Upload, Download, Users,
    IndianRupee,
    Mail,
    Phone,
    User2,
    Menu
} from 'lucide-react';
import axios from 'axios';
import UpdateProfile from './UpdateProfile';
import UpdateFiles from './UpdateFiles';
import UploadFile from './UploadFile';
import DownloadFile from './DownloadFile';
import OtherProfiles from './OtherProfiles';

const Profile = () => {
    const [role, setRole] = useState(null)
    const [userId, setUserId] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [distributordetail, setDistributor] = useState({});
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const distributor = sessionStorage.getItem('user');
            if (distributor) {
                const parsedDistributor = JSON.parse(distributor);
                setUserId(parsedDistributor._id);
            }
        }
    }, []);

    useEffect(() => {
        const handleFetchDistributor = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://www.api.upfda.in/api/v1/get_distributor_by_id/${userId}`);
                setDistributor(data.data);
                const allData = data.data
                setRole(allData?.type)
                setIsVerified(allData?.isVerified)
            } catch (error) {
                console.log("Internal server error", error);
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            handleFetchDistributor();
        }
    }, [userId]);

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.href = '/'
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const InfoCard = ({ icon: Icon, title, value }) => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#FFFDE0] rounded-lg">
                    <Icon className="w-5 h-5 text-[#D6000A]" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500 truncate">{title}</p>
                    <p className="font-semibold text-gray-900 truncate">{value}</p>
                </div>
            </div>
        </div>
    );

    const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 w-full md:w-auto
                ${isActive
                    ? 'bg-[#D6000A] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            <Icon className="w-5 h-5" />
            <span className="whitespace-nowrap">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Profile Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden md:inline">Log Out</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                    {role === 'Association' ? (
                        <>
                            <InfoCard
                                icon={Building}
                                title="Entity Name"
                                value={distributordetail.distributorEntityName}
                            />
                            <InfoCard
                                icon={MapPin}
                                title="Location"
                                value={distributordetail.city}
                            />
                            <InfoCard
                                icon={Mail}
                                title="Email"
                                value={distributordetail.email}
                            />
                            <InfoCard
                                icon={Phone}
                                title="Phone No."
                                value={distributordetail.phoneNo}
                            />
                        </>
                    ) : (
                        <>
                            <InfoCard
                                icon={Building}
                                title="Entity Name"
                                value={distributordetail.distributorEntityName}
                            />
                            <InfoCard
                                icon={MapPin}
                                title="Location"
                                value={distributordetail.city}
                            />
                            <InfoCard
                                icon={Users}
                                title="Customers"
                                value={distributordetail.numberOfCustomers}
                            />
                            <InfoCard
                                icon={IndianRupee}
                                title="Monthly Turnover"
                                value={distributordetail.monthlyTurnOver}
                            />
                        </>
                    )}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                    {/* Mobile Menu Button */}
                    <div className="md:hidden mb-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg"
                        >
                            <span className="font-medium">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden space-y-2 ${isMobileMenuOpen ? 'block' : 'hidden'} mb-4`}>
                        <TabButton
                            icon={User}
                            label="Update Profile"
                            isActive={activeTab === 'profile'}
                            onClick={() => {
                                setActiveTab('profile');
                                setIsMobileMenuOpen(false);
                            }}
                        />
                        <TabButton
                            icon={Upload}
                            label="Update Documents"
                            isActive={activeTab === 'update-files'}
                            onClick={() => {
                                setActiveTab('update-files');
                                setIsMobileMenuOpen(false);
                            }}
                        />
                        <TabButton
                            icon={Upload}
                            label="Upload Files"
                            isActive={activeTab === 'upload'}
                            onClick={() => {
                                setActiveTab('upload');
                                setIsMobileMenuOpen(false);
                            }}
                        />
                        <TabButton
                            icon={Download}
                            label="Download Files"
                            isActive={activeTab === 'download'}
                            onClick={() => {
                                setActiveTab('download');
                                setIsMobileMenuOpen(false);
                            }}
                        />
                        {isVerified === true && (
                            <TabButton
                                icon={User2}
                                label="Others Profile"
                                isActive={activeTab === 'Profiles'}
                                onClick={() => {
                                    setActiveTab('Profiles');
                                    setIsMobileMenuOpen(false);
                                }}
                            />
                        )}
                    </div>

                    {/* Desktop Tabs */}
                    <div className="hidden md:flex space-x-4 mb-6 overflow-x-auto">
                        <TabButton
                            icon={User}
                            label="Update Profile"
                            isActive={activeTab === 'profile'}
                            onClick={() => setActiveTab('profile')}
                        />
                        <TabButton
                            icon={Upload}
                            label="Update Documents"
                            isActive={activeTab === 'update-files'}
                            onClick={() => setActiveTab('update-files')}
                        />
                        <TabButton
                            icon={Upload}
                            label="Upload Files"
                            isActive={activeTab === 'upload'}
                            onClick={() => setActiveTab('upload')}
                        />
                        <TabButton
                            icon={Download}
                            label="Download Files"
                            isActive={activeTab === 'download'}
                            onClick={() => setActiveTab('download')}
                        />
                        {isVerified === true && (
                            <TabButton
                                icon={User2}
                                label="Others Profile"
                                isActive={activeTab === 'Profiles'}
                                onClick={() => setActiveTab('Profiles')}
                            />
                        )}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-6">
                        {activeTab === 'profile' && (
                            <UpdateProfile />
                        )}
                        {activeTab === 'update-files' && (
                            <UpdateFiles />
                        )}
                        {activeTab === 'upload' && (
                            <UploadFile />
                        )}
                        {activeTab === 'download' && (
                            <DownloadFile />
                        )}
                        {activeTab === 'Profiles' && (
                            <OtherProfiles />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile