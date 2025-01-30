"use client";

import Select from "react-select";

const StepOne = ({ formData, setFormData, setStep }) => {
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
            [name]: selectedOptions.map((option) => option.value),
        }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

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
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Basic Information */}
                <div className="col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Distributor Entity Name
                    </label>
                    <input
                        type="text"
                        name="distributorEntityName"
                        value={formData.distributorEntityName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                        className="mt-1 block w-full px-[6px] border py-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Associated Brands (Current Companies)</label>
                    <input
                        type="text"
                        name="associatedCompany"
                        value={formData.associatedCompany}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                {/* Multi-Select Fields */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">What describes your Coverage Area best?</label>
                    <Select
                        isMulti
                        options={options.coverageArea}
                        onChange={(selectedOptions) => handleSelectChange("coverageArea", selectedOptions)}
                        className="mt-1"
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Started Year</label>
                    <input
                        type="number"
                        name="startingYear"
                        value={formData.startingYear}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Coverage Area Description (Name of Localities / Cities / Towns / Districts / States)</label>
                    <input
                        type="text"
                        name="coverageAreaDescription"
                        value={formData.coverageAreaDescription}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Number of vehicles owned</label>
                    <input
                        type="number"
                        name="noOfVehicles"
                        value={formData.noOfVehicles}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Type of vehicles owned (Tata Ace, Mahindra Bolero etc.)</label>
                    <input
                        type="text"
                        name="typeOfVehicles"
                        value={formData.typeOfVehicles}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-[6px] border py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                        Channels of Operation
                    </label>
                    <Select
                        isMulti
                        options={options.channelsOfOperation}
                        onChange={(selectedOptions) =>
                            handleSelectChange("channelsOfOperation", selectedOptions)
                        }
                        className="mt-1"
                    />
                </div>

                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Types of Operation</label>
                    <Select
                        isMulti
                        options={options.typesOfOperation}
                        onChange={(selectedOptions) => handleSelectChange("typesOfOperation", selectedOptions)}
                        className="mt-1"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Business Operations</label>
                    <Select
                        isMulti
                        options={options.businessOperations}
                        onChange={(selectedOptions) =>
                            handleSelectChange("businessOperations", selectedOptions)
                        }
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#CF2732] text-white px-6 py-2 rounded-md hover:bg-[#ff0213] focus:outline-none focus:ring-2 focus:ring-[#CF2732] focus:ring-offset-2"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
};

export default StepOne;
