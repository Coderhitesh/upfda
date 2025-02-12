"use client";
import Select from "react-select";
import { toast } from 'react-hot-toast';

const AssociationFor = ({ formData, setFormData, setStep, isLoading }) => {
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
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Association Name (registered)
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
                        Association registered as
                    </label>
                    <Select
                        isMulti
                        options={options.associationRegisteredAs}
                        onChange={(selectedOptions) =>
                            handleSelectChange("associationRegisteredAs", selectedOptions)
                        }
                        value={options.associationRegisteredAs.filter(option =>
                            formData.associationRegisteredAs?.includes(option.value)
                        )}
                        className="mt-1"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Registered Address</label>
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
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Mobile Number of the Head (preferably Whatsapp)</label>
                    <input
                        type="Number"
                        name="numberOfHead"
                        value={formData.numberOfHead}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
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
                        type="Number"
                        name="numberOfExecutiveHead"
                        value={formData.numberOfExecutiveHead}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Who can be member of the association?
                    </label>
                    <Select
                        isMulti
                        options={options.memberOfAssociation}
                        onChange={(selectedOptions) =>
                            handleSelectChange("memberOfAssociation", selectedOptions)
                        }
                        value={options.memberOfAssociation.filter(option =>
                            formData.memberOfAssociation?.includes(option.value)
                        )}
                        className="mt-1"
                        required
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
                    <label className="block text-sm font-medium text-gray-700">
                        What type of businesses the association is concerned with?
                    </label>
                    <Select
                        isMulti
                        options={options.typeOfBusinessAssociation}
                        onChange={(selectedOptions) =>
                            handleSelectChange("typeOfBusinessAssociation", selectedOptions)
                        }
                        value={options.typeOfBusinessAssociation.filter(option =>
                            formData.typeOfBusinessAssociation?.includes(option.value)
                        )}
                        className="mt-1"
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

export default AssociationFor
