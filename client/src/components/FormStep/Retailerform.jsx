"use client";
import Select from "react-select";
import { toast } from 'react-hot-toast';
const Retailerform = ({ formData, setFormData, setStep, isLoading }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (name, selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            [name]: selectedOptions ? selectedOptions.map((option) => option.value) : [],
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
        //     'location',
        //     'gstNo',
        //     'panNo',
        //     'FSSAINo',
        //     'ownerName',
        //     'phoneNo',
        //     'email',
        //     'website',
        //     'startingYear',
        //     'numberOfCustomers',
        //     'godownArea',
        //     'noOfRetailerOutlets',
        //     'noOfEmployees',
        //     'monthlyTurnOver',
        //     'isERPUsed',
        //     'distributorAssociationName',
        //     'Password'
        // ];

        // const requiredArrayFields = [
        //     'customerFacilitiesProvided',
        //     'businessOperations'
        // ];

        // Check regular fields
        // for (const field of requiredFields) {
        //     if (!formData[field]) {
        //         toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        //         return false;
        //     }
        // }

        // Check array fields
        // for (const field of requiredArrayFields) {
        //     if (!formData[field]?.length) {
        //         toast.error(`Please select at least one option for ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
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

    const handleNext = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setStep(2);
        }
    };

    const options = {
        customerFacilitiesProvided: [
            { value: "Home Delivery", label: "Home Delivery" },
            { value: "Credit to Customers", label: "Credit to Customers" },
            { value: "Mobile Catalogue & Order facility", label: "Mobile Catalogue & Order facility" }
        ],
        businessOperations: [
            { value: "Cold Chain Products", label: "Cold Chain Products" },
            { value: "FMCG & Consumer Products", label: "FMCG & Consumer Products" },
            { value: "Cosmetics", label: "Cosmetics" },
            { value: "Medical", label: "Medical" },
            { value: "Telecom", label: "Telecom" },
            { value: "Commodities", label: "Commodities" },
            { value: "Other", label: "Other" }
        ]
    };
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Retailer Entity Name (registered)
                    </label>
                    <input
                        type="text"
                        name="distributorEntityName"
                        value={formData.distributorEntityName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Constitution of the entity
                    </label>
                    <select
                        name="constitutionEntity"
                        value={formData.constitutionEntity}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Proprietor">Proprietor</option>
                        <option value="Partnership / LLP">Partnership / LLP</option>
                        <option value="Private Limited">Private Limited</option>
                        <option value="Limited">Limited</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full px-[6px] border py-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
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
                    <label className="block text-sm font-medium text-gray-700">Owner(s) Name (Separate different names by comma)</label>
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Mobile Number of owner (preferably Whatsapp)</label>
                    <input
                        type="Number"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Alternate Mobile Number</label>
                    <input
                        type="Number"
                        name="alternatePhoneNo"
                        value={formData.alternatePhoneNo}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Email ID</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
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
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Started Year</label>
                    <input
                        type="date"
                        name="startingYear"
                        value={formData.startingYear}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Customer Base (number of customers served)</label>
                    <input
                        type="number"
                        name="numberOfCustomers"
                        value={formData.numberOfCustomers}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Godown Area (sq.ft.)</label>
                    <input
                        type="number"
                        name="godownArea"
                        value={formData.godownArea}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Number of retail outlets (if a retail chain)</label>
                    <input
                        type="number"
                        name="noOfRetailerOutlets"
                        value={formData.noOfRetailerOutlets}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Number of employees</label>
                    <input
                        type="number"
                        name="noOfEmployees"
                        value={formData.noOfEmployees}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Monthly Average Turnover</label>
                    <input
                        type="text"
                        name="monthlyTurnOver"
                        value={formData.monthlyTurnOver}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">ERP (Billing Software) in use</label>
                    <input
                        type="text"
                        name="isERPUsed"
                        value={formData.isERPUsed}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
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
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Customer facilities provided
                    </label>
                    <Select
                        isMulti
                        options={options.customerFacilitiesProvided}
                        onChange={(selectedOptions) =>
                            handleSelectChange("customerFacilitiesProvided", selectedOptions)
                        }
                        value={options.customerFacilitiesProvided.filter(option =>
                            formData.customerFacilitiesProvided?.includes(option.value)
                        )}
                        className="mt-1"
                        required
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Types of Operation</label>
                    <Select
                        isMulti
                        options={options.businessOperations}
                        onChange={(selectedOptions) => handleSelectChange("businessOperations", selectedOptions)}
                        value={options.businessOperations.filter(option =>
                            formData.businessOperations?.includes(option.value)
                        )}
                        className="mt-1"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="text"
                        name="Password"
                        value={formData.Password}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end mt-8">
                <button
                    type="submit"
                    className="bg-[#CF2732] text-white px-6 py-2 rounded-md hover:bg-[#CF2732] focus:outline-none focus:ring-2 focus:ring-[#CF2732] focus:ring-offset-2"
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default Retailerform
