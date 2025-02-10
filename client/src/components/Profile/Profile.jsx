"use client"
import React, { useState, useEffect } from 'react';
import {
    User, Building, MapPin, LogOut, Upload, Download, Users, DollarSign,
    IndianRupee
} from 'lucide-react';
import axios from 'axios';
import UpdateProfile from './UpdateProfile';
import UpdateFiles from './UpdateFiles';
import UploadFile from './UploadFile';
import DownloadFile from './DownloadFile';


const Profile = () => {
    // const distributor = sessionStorage.getItem('user')
    // const ParseDistributor = JSON.parse(distributor)
    const [userId, setUserId] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [distributordetail, setDistributor] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const distributor = sessionStorage.getItem('user');
            if (distributor) {
                const parsedDistributor = JSON.parse(distributor);
                setUserId(parsedDistributor._id);
            }
        }
    }, []);

    // Fetch distributor data (commented out as per original code)
    useEffect(() => {
        const handleFetchDistributor = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://www.test.blueaceindia.com/api/v1/get_distributor_by_id/${userId}`);
                setDistributor(data.data);
            } catch (error) {
                console.log("Internal server error", error);
            } finally {
                setLoading(false);
            }
        };
        if(userId){
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
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
        ${isActive
                    ? 'bg-[#D6000A] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Profile Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex space-x-4 mb-6">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile
