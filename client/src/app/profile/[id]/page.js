"use client"
import { useEffect, useState } from 'react';
import { FaBuilding, FaStore, FaUsers, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const StarRating = ({ rating, setRating, readOnly = false }) => {
    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => !readOnly && setRating(star)}
                    className={`text-xl ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
                    disabled={readOnly}
                >
                    {star <= rating ? (
                        <FaStar className="text-yellow-400" />
                    ) : (
                        <FaRegStar className="text-yellow-400" />
                    )}
                </button>
            ))}
        </div>
    );
};

const ReviewForm = ({ providerId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }
        if (!review.trim()) {
            setError('Please write a review');
            return;
        }

        try {
            setSubmitting(true);
            const userId = JSON.parse(sessionStorage.getItem('user'))?._id;
            if (!userId) {
                setError('Please login to submit a review');
                return;
            }

            const response = await axios.post('https://www.test.blueaceindia.com/api/v1/create_review', {
                rating,
                review,
                providerId,
                userId
            });

            if (response.data.success) {
                setRating(0);
                setReview('');
                setError('');
                onReviewSubmitted();
                toast.success(response?.data?.message)
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to submit review');
            console.log("Internal server error", error)
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <StarRating rating={rating} setRating={setRating} />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D40900] focus:border-transparent"
                    rows="4"
                    placeholder="Share your experience..."
                />
            </div>

            {error && (
                <p className="text-red-600 mb-4 text-sm">{error}</p>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#D40900] text-white py-2 px-4 rounded-md hover:bg-[#B30700] transition-colors disabled:bg-gray-400"
            >
                {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};

const ReviewList = ({ reviews }) => {
    return (
        <div className="space-y-6">
            {reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-semibold">
                                    {review.userId.distributorEntityName?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <div>
                                <p className="font-semibold">{review.userId.distributorEntityName}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <StarRating rating={review.rating} readOnly />
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                </div>
            ))}
        </div>
    );
};

export default function ProfileDetail() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    const fetchProfile = async () => {
        if (!id) return;
        try {
            setLoading(true);
            const { data } = await axios.get(`https://www.test.blueaceindia.com/api/v1/get_distributor_by_id/${id}`);
            setProfile(data.data);
        } catch (error) {
            setError("Failed to fetch profile details.");
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            setLoadingReviews(true);
            const { data } = await axios.get(`https://www.test.blueaceindia.com/api/v1/review_by_provider/${id}`);
            setReviews(data.data || []);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoadingReviews(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        if (id) {
            fetchReviews();
        }
    }, [id]);

    const getProfileIcon = (type) => {
        switch (type) {
            case 'Distributor':
                return <FaBuilding className="w-16 h-16 text-white" />;
            case 'Retailer':
                return <FaStore className="w-16 h-16 text-white" />;
            case 'Association':
                return <FaUsers className="w-16 h-16 text-white" />;
            default:
                return null;
        }
    };

    const getProfileFields = (type) => {
        if (!profile) return [];

        const commonFields = [
            { label: 'Entity Name', value: profile.distributorEntityName, icon: <FaBuilding /> },
            { label: 'Address', value: profile.address, icon: <FaMapMarkerAlt /> },
            { label: 'City', value: profile.city },
            { label: 'State', value: profile.state },
            { label: 'Pincode', value: profile.pincode },
            { label: 'Location', value: profile.location },
            { label: 'Phone', value: profile.phoneNo, icon: <FaPhone /> },
            { label: 'Alternate Phone', value: profile.alternatePhoneNo },
            { label: 'Email', value: profile.email, icon: <FaEnvelope /> },
        ];

        switch (type) {
            case 'Distributor':
                return {
                    basic: commonFields,
                    business: [
                        { label: 'Constitution Entity', value: profile.constitutionEntity },
                        { label: 'GST No', value: profile.gstNo },
                        { label: 'PAN No', value: profile.panNo },
                        { label: 'FSSAI No', value: profile.FSSAINo },
                        { label: 'Owner Names', value: profile.ownerName?.join(', ') },
                        { label: 'Associated Company', value: profile.associatedCompany },
                        { label: 'Starting Year', value: new Date(profile.startingYear).getFullYear() },
                    ],
                    operations: [
                        { label: 'Coverage Area', value: profile.coverageArea?.join(', ') },
                        { label: 'Coverage Description', value: profile.coverageAreaDescription?.join(', ') },
                        { label: 'Number of Customers', value: profile.numberOfCustomers },
                        { label: 'Godown Area', value: profile.godownArea },
                        { label: 'No. of Employees', value: profile.noOfEmployees },
                        { label: 'No. of Vehicles', value: profile.noOfVehicles },
                        { label: 'Type of Vehicles', value: profile.typeOfVehicles?.join(', ') },
                        { label: 'Monthly Turnover', value: profile.monthlyTurnOver },
                        { label: 'ERP Used', value: profile.isERPUsed },
                        { label: 'Distributor Association', value: profile.distributorAssociationName },
                        { label: 'Channels of Operation', value: profile.channelsOfOperation?.join(', ') },
                        { label: 'Types of Operation', value: profile.typesOfOperation?.join(', ') },
                        { label: 'Business Operations', value: profile.businessOperations?.join(', ') },
                    ]
                };
            case 'Retailer':
                return {
                    basic: commonFields,
                    business: [
                        { label: 'GST No', value: profile.gstNo },
                        { label: 'PAN No', value: profile.panNo },
                        { label: 'FSSAI No', value: profile.FSSAINo },
                        { label: 'Owner Names', value: profile.ownerName?.join(', ') },
                        { label: 'Website', value: profile.website },
                        { label: 'Starting Year', value: new Date(profile.startingYear).getFullYear() },
                    ],
                    operations: [
                        { label: 'Number of Customers', value: profile.numberOfCustomers },
                        { label: 'Godown Area', value: profile.godownArea },
                        { label: 'No. of Outlets', value: profile.noOfRetailerOutlets },
                        { label: 'No. of Employees', value: profile.noOfEmployees },
                        { label: 'Monthly Turnover', value: profile.monthlyTurnOver },
                        { label: 'ERP Used', value: profile.isERPUsed },
                        { label: 'Distributor Association', value: profile.distributorAssociationName },
                        { label: 'Customer Facilities', value: profile.customerFacilitiesProvided?.join(', ') },
                        { label: 'Business Operations', value: profile.businessOperations?.join(', ') },
                    ]
                };
            case 'Association':
                return {
                    basic: commonFields,
                    business: [
                        { label: 'Association Registered As', value: profile.associationRegisteredAs?.join(', ') },
                        { label: 'Starting Year', value: new Date(profile.startingYear).getFullYear() },
                        { label: 'Website', value: profile.website },
                    ],
                    operations: [
                        { label: 'Head Name', value: profile.nameOfHead },
                        { label: 'Number of Head', value: profile.numberOfHead },
                        { label: 'Executive Head', value: profile.nameOfExecutiveHead },
                        { label: 'Number of Executive Head', value: profile.numberOfExecutiveHead },
                        { label: 'Member of Association', value: profile.memberOfAssociation?.join(', ') },
                        { label: 'Number of Members', value: profile.noOfMember },
                        { label: 'Type of Business Association', value: profile.typeOfBusinessAssociation?.join(', ') },
                        { label: 'Distributor Association Name', value: profile.distributorAssociationName },
                    ]
                };
            default:
                return { basic: commonFields };
        }
    };

    const renderFieldGroup = (fields) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2 mb-1">
                        {field.icon && <span className="text-gray-500">{field.icon}</span>}
                        <p className="text-sm font-medium text-gray-500">{field.label}</p>
                    </div>
                    <p className="font-medium text-gray-800">{field.value || 'N/A'}</p>
                </div>
            ))}
        </div>
    );

    const renderImages = () => {
        const images = [
            { label: 'Office & Godown Images', images: profile.officeAndGodownImage },
            { label: 'GST Document', image: profile.gstImage },
            { label: 'FSSAI Document', image: profile.fssaiImage },
            { label: 'Partner 1 Document', image: profile.partner1Image },
            { label: 'Partner 2 Document', image: profile.partner2Image },
            { label: 'Other Documents', image: profile.anyOtherDocImage }
        ];

        return (
            <div className="space-y-8">
                {images.map((item, index) => {
                    if (item.images) {
                        return (
                            <div key={index} className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">{item.label}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {item.images.map((img, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={img.url}
                                            alt={`${item.label} ${imgIndex + 1}`}
                                            className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    } else if (item.image?.url) {
                        return (
                            <div key={index} className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">{item.label}</h3>
                                <img
                                    src={item.image.url}
                                    alt={item.label}
                                    className="w-full max-w-2xl h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    const renderReviews = () => {
        if (loadingReviews) {
            return (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#D40900] border-t-transparent"></div>
                </div>
            );
        }

        return (
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">Reviews</h3>
                            <p className="text-gray-600">
                                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center space-x-2">
                                <StarRating
                                    rating={Math.round(profile.averageRating || 0)}
                                    readOnly
                                />
                                <span className="text-2xl font-bold text-gray-800">
                                    {(profile.averageRating || 0).toFixed(1)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">Average rating</p>
                        </div>
                    </div>

                    <ReviewForm
                        providerId={id}
                        onReviewSubmitted={() => {
                            fetchReviews();
                            fetchProfile();
                        }}
                    />
                </div>

                {reviews.length > 0 ? (
                    <ReviewList reviews={reviews} />
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No reviews yet. Be the first to review!
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D40900] border-t-transparent"></div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-red-600 mb-4">{error || "Profile not found"}</p>
                </div>
            </div>
        );
    }

    const profileData = getProfileFields(profile.type);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-[#D40900] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center space-x-6">
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                            {getProfileIcon(profile.type)}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">{profile.distributorEntityName}</h1>
                            <p className="text-xl opacity-90 mt-2">{profile.type}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-b bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {['details', 'business', 'operations', 'documents', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                        ? 'border-[#D40900] text-[#D40900]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {activeTab === 'details' && renderFieldGroup(profileData.basic)}
                    {activeTab === 'business' && profileData.business && renderFieldGroup(profileData.business)}
                    {activeTab === 'operations' && profileData.operations && renderFieldGroup(profileData.operations)}
                    {activeTab === 'documents' && renderImages()}
                    {activeTab === 'reviews' && renderReviews()}
                </div>
            </div>
        </div>
    );
}