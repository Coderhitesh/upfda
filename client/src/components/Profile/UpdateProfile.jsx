"use client"
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { toast } from 'react-hot-toast';
import { Edit } from 'lucide-react';
import axios from 'axios';

const UpdateProfile = () => {
    const [role, setRole] = useState(null)
    // const distributor = sessionStorage.getItem('user');
    // const ParseDistributor = JSON.parse(distributor);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const distributor = sessionStorage.getItem('user');
            if (distributor) {
                const parsedDistributor = JSON.parse(distributor);
                setUserId(parsedDistributor._id);
            }
        }
    }, []);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        distributorEntityName: "",
        constitutionEntity: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        location: "",
        gstNo: "",
        panNo: "",
        FSSAINo: "",
        ownerName: [],
        phoneNo: "",
        alternatePhoneNo: "",
        email: "",
        associatedCompany: "",
        coverageArea: [],
        coverageAreaDescription: [],
        startingYear: "",
        numberOfCustomers: "",
        godownArea: "",
        noOfEmployees: "",
        noOfVehicles: "",
        typeOfVehicles: [],
        monthlyTurnOver: "",
        channelsOfOperation: [],
        typesOfOperation: [],
        businessOperations: [],
        isERPUsed: "",
        website: "",
        noOfRetailerOutlets: "",
        customerFacilitiesProvided: [],
        associationRegisteredAs: [],
        nameOfHead: "",
        numberOfHead: "",
        nameOfExecutiveHead: "",
        numberOfExecutiveHead: "",
        memberOfAssociation: [],
        typeOfBusinessAssociation: [],
        noOfAssociation: "",
        distributorAssociationName: "",
        noOfMember: "",
    });

    useEffect(() => {
        const handleFetchDistributor = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://www.test.blueaceindia.com/api/v1/get_distributor_by_id/${userId}`);
                const distributorData = data.data;
                setRole(distributorData?.type)

                // Transform array data for react-select
                const transformSelectData = (field) => {
                    return distributorData[field]?.map(item => ({
                        value: item,
                        label: item
                    })) || [];
                };

                setFormData({
                    distributorEntityName: distributorData.distributorEntityName || "",
                    constitutionEntity: distributorData.constitutionEntity || "",
                    address: distributorData.address || "",
                    city: distributorData.city || "",
                    state: distributorData.state || "",
                    pincode: distributorData.pincode || "",
                    location: distributorData.location || "",
                    gstNo: distributorData.gstNo || "",
                    panNo: distributorData.panNo || "",
                    FSSAINo: distributorData.FSSAINo || "",
                    ownerName: distributorData.ownerName || [],
                    phoneNo: distributorData.phoneNo || "",
                    alternatePhoneNo: distributorData.alternatePhoneNo || "",
                    email: distributorData.email || "",
                    associatedCompany: distributorData.associatedCompany || "",
                    coverageArea: transformSelectData('coverageArea'),
                    coverageAreaDescription: distributorData.coverageAreaDescription || [],
                    startingYear: distributorData.startingYear?.split('T')[0] || "",
                    numberOfCustomers: distributorData.numberOfCustomers || "",
                    godownArea: distributorData.godownArea || "",
                    noOfEmployees: distributorData.noOfEmployees || "",
                    noOfVehicles: distributorData.noOfVehicles || "",
                    typeOfVehicles: distributorData.typeOfVehicles || [],
                    monthlyTurnOver: distributorData.monthlyTurnOver || "",
                    channelsOfOperation: transformSelectData('channelsOfOperation'),
                    typesOfOperation: transformSelectData('typesOfOperation'),
                    businessOperations: transformSelectData('businessOperations'),
                    isERPUsed: distributorData.isERPUsed || "",
                    website: distributorData.website || "",
                    noOfRetailerOutlets: distributorData.noOfRetailerOutlets || "",
                    customerFacilitiesProvided: transformSelectData('customerFacilitiesProvided'),
                    associationRegisteredAs: transformSelectData('associationRegisteredAs'),
                    nameOfHead: distributorData.nameOfHead || "",
                    numberOfHead: distributorData.numberOfHead || "",
                    nameOfExecutiveHead: distributorData.nameOfExecutiveHead || "",
                    numberOfExecutiveHead: distributorData.numberOfExecutiveHead || "",
                    memberOfAssociation: transformSelectData('memberOfAssociation'),
                    typeOfBusinessAssociation: transformSelectData('typeOfBusinessAssociation'),
                    noOfAssociation: distributorData.noOfAssociation || "",
                    distributorAssociationName: distributorData.distributorAssociationName || "",
                    noOfMember: distributorData.noOfMember || "",
                });
            } catch (error) {
                console.log("Internal server error", error);
                toast.error("Failed to fetch distributor data");
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            handleFetchDistributor();
        }
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Handle arrays that come from comma-separated inputs
        if (['ownerName', 'typeOfVehicles', 'coverageAreaDescription'].includes(name)) {
            setFormData(prev => ({
                ...prev,
                [name]: value.split(',').map(item => item.trim())
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSelectChange = (name, selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            [name]: selectedOptions
        }));
    };

    const validateForm = () => {
        // const requiredFields = [
        //     'distributorEntityName',
        //     'constitutionEntity',
        //     'address',
        //     'city',
        //     'state',
        //     'pincode',
        //     'gstNo',
        //     'panNo',
        //     'FSSAINo',
        //     'phoneNo',
        //     'email'
        // ];

        // for (const field of requiredFields) {
        //     if (!formData[field]) {
        //         toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        //         return false;
        //     }
        // }

        // Validate phone number
        if (!/^\d{10}$/.test(formData.phoneNo)) {
            toast.error('Please enter a valid 10-digit phone number');
            return false;
        }

        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Transform the data for API submission
        const submitData = {
            ...formData,
            coverageArea: formData.coverageArea.map(item => item.value),
            channelsOfOperation: formData.channelsOfOperation.map(item => item.value),
            typesOfOperation: formData.typesOfOperation.map(item => item.value),
            businessOperations: formData.businessOperations.map(item => item.value),

            customerFacilitiesProvided: formData.customerFacilitiesProvided.map(item => item.value),
            associationRegisteredAs: formData.associationRegisteredAs.map(item => item.value),
            memberOfAssociation: formData.memberOfAssociation.map(item => item.value),
            typeOfBusinessAssociation: formData.typeOfBusinessAssociation.map(item => item.value),
        };

        try {
            setLoading(true);
            const response = await axios.put(
                `https://www.test.blueaceindia.com/api/v1/update_profile/${userId}`,
                submitData
            );
            toast.success(response.data.message || 'Profile updated successfully');
        } catch (error) {
            console.error('Update failed:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const options = {
        coverageArea: [
            { value: "Partial City / Town", label: "Partial City / Town" },
            { value: "Single City / Town", label: "Single City / Town" },
            { value: "Multiple Cities / Towns", label: "Multiple Cities / Towns" },
            { value: "Entire District", label: "Entire District" },
            { value: "Multiple Districts", label: "Multiple Districts" },
            { value: "Entire State", label: "Entire State" },
            { value: "Multiple States", label: "Multiple States" },
            { value: "PAN India", label: "PAN India" },
        ],
        channelsOfOperation: [
            { value: "General Trade", label: "General Trade" },
            { value: "HORECA", label: "HORECA" },
            { value: "Modern Trade", label: "Modern Trade" },
            { value: "E-Comm. & Quick Comm", label: "E-Comm. & Quick Comm" },
            { value: "CSD & CPC", label: "CSD & CPC" },
            { value: "Other Channels", label: "Other Channels" },
        ],
        typesOfOperation: [
            { value: "Distributor (DBR)", label: "Distributor (DBR)" },
            { value: "Super Stockist (SS)", label: "Super Stockist (SS)" },
            { value: "Brand Marketing or Manufacturer", label: "Brand Marketing or Manufacturer" },
        ],
        businessOperations: [
            { value: "Cold Chain", label: "Cold Chain" },
            { value: "FMCG", label: "FMCG" },
            { value: "Cosmetics", label: "Cosmetics" },
            { value: "Medical", label: "Medical" },
            { value: "Telecom", label: "Telecom" },
            { value: "Commodities", label: "Commodities" },
            { value: "Other", label: "Other" },
        ],

        customerFacilitiesProvided: [
            { value: "Home Delivery", label: "Home Delivery" },
            { value: "Credit to Customers", label: "Credit to Customers" },
            { value: "Mobile Catalogue & Order facility", label: "Mobile Catalogue & Order facility" }
        ],
        associationRegisteredAs: [
            { value: "Societies Registration Act of 1860", label: "Societies Registration Act of 1860" },
            { value: "Indian Trusts Act of 1882", label: "Indian Trusts Act of 1882" },
            { value: "Section 8 Companies Act", label: "Section 8 Companies Act" },
            { value: "Unregistered", label: "Unregistered" },
            { value: "Other", label: "Other" }
        ],
        memberOfAssociation: [
            { value: "Distributors", label: "Distributors" },
            { value: "Wholesalers", label: "Wholesalers" },
            { value: "Traders", label: "Traders" },
            { value: "Retailers", label: "Retailers" },
            { value: "Association & Groups", label: "Association & Groups" },
            { value: "Brands & Manufacturers", label: "Brands & Manufacturers" },
            { value: "Individuals - Employees, Sales Staff etc.", label: "Individuals - Employees, Sales Staff etc." },
            { value: "Other", label: "Other" }
        ],
        typeOfBusinessAssociation: [
            { value: "FMCG & Consumer Products", label: "FMCG & Consumer Products" },
            { value: "Commodities", label: "Commodities" },
            { value: "Cosmetics", label: "Cosmetics" },
            { value: "Medical", label: "Medical" },
            { value: "Telecom", label: "Telecom" },
            { value: "Other", label: "Other" }
        ],
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                    {role === 'Distributor' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Basic Information */}
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Distributor Entity Name
                                </label>
                                <input
                                    type="text"
                                    name="distributorEntityName"
                                    value={formData.distributorEntityName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Constitution of the entity
                                </label>
                                <select
                                    name="constitutionEntity"
                                    value={formData.constitutionEntity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Proprietor">Proprietor</option>
                                    <option value="Partnership / LLP">Partnership / LLP</option>
                                    <option value="Private Limited">Private Limited</option>
                                    <option value="Limited">Limited</option>
                                </select>
                            </div>

                            {/* Address Fields */}

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">GST No.</label>
                                <input
                                    type="text"
                                    name="gstNo"
                                    value={formData.gstNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">PAN No.</label>
                                <input
                                    type="text"
                                    name="panNo"
                                    value={formData.panNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">FSSAI No.</label>
                                <input
                                    type="text"
                                    name="FSSAINo"
                                    value={formData.FSSAINo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Contact Information */}

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Alternate Phone No.</label>
                                <input
                                    type="tel"
                                    name="alternatePhoneNo"
                                    value={formData.alternatePhoneNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Associated Company</label>
                                <input
                                    type="text"
                                    name="associatedCompany"
                                    value={formData.associatedCompany}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Coverage Area Description</label>
                                <input
                                    type="text"
                                    name="coverageAreaDescription"
                                    value={formData.coverageAreaDescription}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Starting Year</label>
                                <input
                                    type="text"
                                    name="startingYear"
                                    value={formData.startingYear}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Number Of Customers</label>
                                <input
                                    type="Number"
                                    name="numberOfCustomers"
                                    value={formData.numberOfCustomers}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Godown Area (sq.ft.)</label>
                                <input
                                    type="Number"
                                    name="godownArea"
                                    value={formData.godownArea}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Number of employees</label>
                                <input
                                    type="Number"
                                    name="noOfEmployees"
                                    value={formData.noOfEmployees}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">No Of Vehicles</label>
                                <input
                                    type="Number"
                                    name="noOfVehicles"
                                    value={formData.noOfVehicles}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Type of vehicles owned (Tata Ace, Mahindra Bolero etc.)</label>
                                <input
                                    type="text"
                                    name="typeOfVehicles"
                                    value={formData.typeOfVehicles}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Monthly Average Turnover</label>
                                <input
                                    type="text"
                                    name="monthlyTurnOver"
                                    value={formData.monthlyTurnOver}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">ERP (Billing Software) in use</label>
                                <input
                                    type="text"
                                    name="isERPUsed"
                                    value={formData.isERPUsed}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Distributor Association(s) Name you are enrolled with (if any). Type NO if not associated with any association</label>
                                <input
                                    type="text"
                                    name="distributorAssociationName"
                                    value={formData.distributorAssociationName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Multi-Select Fields */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Coverage Area</label>
                                <Select
                                    isMulti
                                    options={options.coverageArea}
                                    value={formData.coverageArea}
                                    onChange={(selected) => handleSelectChange('coverageArea', selected)}
                                    className="mt-1"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Channels of Operation</label>
                                <Select
                                    isMulti
                                    options={options.channelsOfOperation}
                                    value={formData.channelsOfOperation}
                                    onChange={(selected) => handleSelectChange('channelsOfOperation', selected)}
                                    className="mt-1"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Types of Operation</label>
                                <Select
                                    isMulti
                                    options={options.typesOfOperation}
                                    value={formData.typesOfOperation}
                                    onChange={(selected) => handleSelectChange('typesOfOperation', selected)}
                                    className="mt-1"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Business Operations</label>
                                <Select
                                    isMulti
                                    options={options.businessOperations}
                                    value={formData.businessOperations}
                                    onChange={(selected) => handleSelectChange('businessOperations', selected)}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    )}

                    {role === 'Retailer' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Retailer Entity Name
                                </label>
                                <input
                                    type="text"
                                    name="distributorEntityName"
                                    value={formData.distributorEntityName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Constitution of the entity
                                </label>
                                <select
                                    name="constitutionEntity"
                                    value={formData.constitutionEntity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Type</option>
                                    <option value="Proprietor">Proprietor</option>
                                    <option value="Partnership / LLP">Partnership / LLP</option>
                                    <option value="Private Limited">Private Limited</option>
                                    <option value="Limited">Limited</option>
                                </select>
                            </div>
                            {/* Address Fields */}

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">City / Town</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Location (G+ Code)</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">GST No.</label>
                                <input
                                    type="text"
                                    name="gstNo"
                                    value={formData.gstNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">PAN No.</label>
                                <input
                                    type="text"
                                    name="panNo"
                                    value={formData.panNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">FSSAI No.</label>
                                <input
                                    type="text"
                                    name="FSSAINo"
                                    value={formData.FSSAINo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">FSSAI No.</label>
                                <input
                                    type="text"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Alternate Phone No.</label>
                                <input
                                    type="tel"
                                    name="alternatePhoneNo"
                                    value={formData.alternatePhoneNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Starting Year</label>
                                <input
                                    type="Date"
                                    name="startingYear"
                                    value={formData.startingYear}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Number Of Customers</label>
                                <input
                                    type="Number"
                                    name="numberOfCustomers"
                                    value={formData.numberOfCustomers}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Godown Area (sq.ft.)</label>
                                <input
                                    type="Number"
                                    name="godownArea"
                                    value={formData.godownArea}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Number of retail outlets (if a retail chain)</label>
                                <input
                                    type="Number"
                                    name="noOfRetailerOutlets"
                                    value={formData.noOfRetailerOutlets}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Number of employees</label>
                                <input
                                    type="Number"
                                    name="noOfEmployees"
                                    value={formData.noOfEmployees}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Monthly Average Turnover</label>
                                <input
                                    type="text"
                                    name="monthlyTurnOver"
                                    value={formData.monthlyTurnOver}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">ERP (Billing Software) in use</label>
                                <input
                                    type="text"
                                    name="isERPUsed"
                                    value={formData.isERPUsed}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Distributor Association(s) Name you are enrolled with (if any). Type NO if not associated with any association</label>
                                <input
                                    type="text"
                                    name="distributorAssociationName"
                                    value={formData.distributorAssociationName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Customer facilities provided</label>
                                <Select
                                    isMulti
                                    options={options.customerFacilitiesProvided}
                                    value={formData.customerFacilitiesProvided}
                                    onChange={(selected) => handleSelectChange('customerFacilitiesProvided', selected)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Types of Operation</label>
                                <Select
                                    isMulti
                                    options={options.businessOperations}
                                    value={formData.businessOperations}
                                    onChange={(selected) => handleSelectChange('businessOperations', selected)}
                                    className="mt-1"
                                />
                            </div>

                        </div>
                    )}

                    {role === 'Association' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Retailer Entity Name
                                </label>
                                <input
                                    type="text"
                                    name="distributorEntityName"
                                    value={formData.distributorEntityName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Starting Year</label>
                                <input
                                    type="Date"
                                    name="startingYear"
                                    value={formData.startingYear}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">City / Town</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Location (G+ Code)</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Name of Head of the organization (President / Chairman)</label>
                                <input
                                    type="text"
                                    name="nameOfHead"
                                    value={formData.nameOfHead}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <label className="block text-sm font-medium text-gray-700">Mobile Number of the Head (preferably Whatsapp)</label>
                                <input
                                    type="tel"
                                    name="numberOfHead"
                                    value={formData.numberOfHead}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Name of Executive Head of the organization (General Secretary)</label>
                                <input
                                    type="text"
                                    name="nameOfExecutiveHead"
                                    value={formData.nameOfExecutiveHead}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Mobile Number of the Executive Head (preferably Whatsapp)</label>
                                <input
                                    type="tel"
                                    name="numberOfExecutiveHead"
                                    value={formData.numberOfExecutiveHead}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Who can be member of the association?</label>
                                <Select
                                    isMulti
                                    options={options.memberOfAssociation}
                                    value={formData.memberOfAssociation}
                                    onChange={(selected) => handleSelectChange('memberOfAssociation', selected)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Total numeric strength of the organization (number of members)</label>
                                <input
                                    type="Number"
                                    name="noOfMember"
                                    value={formData.noOfMember}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">What type of businesses the association is concerned with?</label>
                                <Select
                                    isMulti
                                    options={options.typeOfBusinessAssociation}
                                    value={formData.typeOfBusinessAssociation}
                                    onChange={(selected) => handleSelectChange('typeOfBusinessAssociation', selected)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Distributor Association(s) Name you are enrolled with (if any). Type NO if not associated with any association</label>
                                <input
                                    type="text"
                                    name="distributorAssociationName"
                                    value={formData.distributorAssociationName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>



                        </div>
                    )}

                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-2 bg-[#D6000A] text-white rounded-lg hover:bg-[#d42d36] transition-colors duration-200 disabled:opacity-50"
                >
                    <Edit className="w-5 h-5" />
                    <span>{loading ? 'Updating...' : 'Update Profile'}</span>
                </button>
            </div>
        </form>
    );
}

export default UpdateProfile
