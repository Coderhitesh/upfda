import React, { useEffect, useState } from 'react';
import { FaBuilding, FaStore, FaUsers, FaArrowRight, FaSearch, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

const ProfileCard = ({ profile }) => {

    const getProfileIcon = (type) => {
        switch (type) {
            case 'Distributor':
                return <FaBuilding className="w-8 h-8 text-blue-600" />;
            case 'Retailer':
                return <FaStore className="w-8 h-8 text-green-600" />;
            case 'Association':
                return <FaUsers className="w-8 h-8 text-purple-600" />;
            default:
                return null;
        }
    };

    const getMainFields = (type) => {
        switch (type) {
            case 'Distributor':
                return [
                    { label: 'Entity Name', value: profile.distributorEntityName },
                    { label: 'Location', value: profile.location },
                    { label: 'Coverage Area', value: profile.coverageArea?.join(', ') },
                    { label: 'Monthly Turnover', value: profile.monthlyTurnOver }
                ];
            case 'Retailer':
                return [
                    { label: 'Entity Name', value: profile.distributorEntityName },
                    { label: 'Location', value: profile.location },
                    { label: 'Outlets', value: profile.noOfRetailerOutlets },
                    { label: 'Monthly Turnover', value: profile.monthlyTurnOver }
                ];
            case 'Association':
                return [
                    { label: 'Entity Name', value: profile.distributorEntityName },
                    { label: 'Head', value: profile.nameOfHead },
                    { label: 'Members', value: profile.noOfMember },
                    { label: 'Location', value: profile.location }
                ];
            default:
                return [];
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {getProfileIcon(profile.type)}
                    <h3 className="text-xl font-semibold text-gray-800">{profile.type}</h3>
                </div>
                <Link
                    href={`/profile/${profile._id}`}
                    // navigate(`/profile/${profile._id}`)
                    // onClick={() => handleRedirect(profile._id)}
                    className="flex items-center space-x-2 text-[#D6000A] hover:text-[#c72830]"
                >
                    <span>View Details</span>
                    <FaArrowRight />
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {getMainFields(profile.type).map((field, index) => (
                    <div key={index} className="space-y-1">
                        <p className="text-sm text-gray-500">{field.label}</p>
                        <p className="font-medium text-gray-800">{field.value || 'N/A'}</p>
                    </div>
                ))}
            </div>

            {profile.officeAndGodownImage && profile.officeAndGodownImage[0] && (
                <div className="mt-4">
                    <img
                        src={profile.officeAndGodownImage[0].url}
                        alt="Office"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>
            )}
        </div>
    );
};

const FilterSection = ({ filters, setFilters, cities, states }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                        value={filters.city}
                        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">All Cities</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                        value={filters.state}
                        onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">All States</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Address</label>
                    <input
                        type="text"
                        value={filters.address}
                        onChange={(e) => setFilters(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Search by address..."
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
};

const OtherProfiles = () => {
    const [allProvider, setAllProvider] = useState([]);
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        city: '',
        state: '',
        address: ''
    });

    const itemsPerPage = 9;
    const cities = [...new Set(allProvider.map(item => item.city))];
    const states = [...new Set(allProvider.map(item => item.state))];

    useEffect(() => {
        if (typeof window !== "undefined") {
            const distributor = sessionStorage.getItem('user');
            if (distributor) {
                const parsedDistributor = JSON.parse(distributor);
                setRole(parsedDistributor?.type);
            }
        }
    }, []);

    const handleFetchProvider = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('https://www.api.upfda.in/api/v1/get_distributor');
            const allDistributor = data.data;
            const filterData = allDistributor.filter((item) => item.type !== role);
            setAllProvider(filterData);
            setFilteredProviders(filterData);
        } catch (error) {
            setError("Failed to fetch profiles. Please try again later.");
            console.log("Internal server error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role) {
            handleFetchProvider();
        }
    }, [role]);

    useEffect(() => {
        let result = allProvider;

        if (filters.city) {
            result = result.filter(item => item.city === filters.city);
        }
        if (filters.state) {
            result = result.filter(item => item.state === filters.state);
        }
        if (filters.address) {
            result = result.filter(item =>
                item.address?.toLowerCase().includes(filters.address.toLowerCase())
            );
        }

        setFilteredProviders(result);
        setCurrentPage(1);
    }, [filters, allProvider]);

    const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProviders = filteredProviders.slice(startIndex, endIndex);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-600 text-center">
                    <p className="text-xl font-semibold">{error}</p>
                    <button
                        onClick={handleFetchProvider}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Other Profiles</h1>

                <FilterSection
                    filters={filters}
                    setFilters={setFilters}
                    cities={cities}
                    states={states}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProviders.map((profile) => (
                        <ProfileCard key={profile._id} profile={profile} />
                    ))}
                </div>

                {filteredProviders.length > itemsPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                {filteredProviders.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-xl">No profiles found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OtherProfiles;