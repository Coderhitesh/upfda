"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import StepOne from "@/components/FormStep/StepOne";
import StepTwo from "@/components/FormStep/StepTwo";
import axios from "axios";
import toast from "react-hot-toast";

export default function page() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
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
        ownerName: [""],
        phoneNo: "",
        alternatePhoneNo: "",
        email: "",
        associatedCompany: "",
        coverageArea: [""],
        coverageAreaDescription: [""],
        startingYear: "",
        numberOfCustomers: "",
        godownArea: "",
        noOfEmployees: "",
        noOfVehicles: "",
        typeOfVehicles: [""],
        monthlyTurnOver: "",
        channelsOfOperation: [""],
        typesOfOperation: [""],
        businessOperations: [""],
        isERPUsed: "",
        distributorAssociationName: "",
        files: {
            officeAndGodownImage: [],
            gstImage: null,
            fssaiImage: null,
            partner1Image: null,
            partner2Image: null,
            anyOtherDocImage: null,
        },
        type: "Distributor",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formDataToSend = new FormData();

        // Append all text fields
        Object.keys(formData).forEach(key => {
            if (key !== "files") {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach(value => {
                        formDataToSend.append(key, value);
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
        });

        // Append files
        Object.keys(formData.files).forEach(key => {
            if (key === "officeAndGodownImage") {
                formData.files[key].forEach(file => {
                    formDataToSend.append(key, file);
                });
            } else if (formData.files[key]) {
                formDataToSend.append(key, formData.files[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:5001/api/v1/create_distributor', formDataToSend);

            // const data = await response.json();
            const data = response.data;

            if (data.success) {
                toast.success('Distributor created successfully!')
                // Reset form or redirect
                setIsLoading(false);
            } else {
                setIsLoading(false);
                toast.error(data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <Building2 className="h-12 w-12 text-[#CF2732]" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Distributor Form
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Complete the registration process in two simple steps
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-[#CF2732]" : "bg-gray-300"
                                    }`}>
                                    <span className="text-white font-semibold">1</span>
                                </div>
                                <div className={`h-1 w-24 ${step === 2 ? "bg-[#CF2732]" : "bg-gray-300"
                                    }`} />
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? "bg-[#CF2732]" : "bg-gray-300"
                                    }`}>
                                    <span className="text-white font-semibold">2</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-2">
                            <span className={`mr-16 text-sm ${step === 1 ? "text-[#CF2732] font-semibold" : "text-gray-500"
                                }`}>
                                Basic Information
                            </span>
                            <span className={`text-sm ${step === 2 ? "text-[#CF2732] font-semibold" : "text-gray-500"
                                }`}>
                                Documents Upload
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
                        {step === 1 ? (
                            <StepOne
                                formData={formData}
                                setFormData={setFormData}
                                setStep={setStep}
                            />
                        ) : (
                            <StepTwo
                                formData={formData}
                                setFormData={setFormData}
                                setStep={setStep}
                                isLoading={isLoading}
                            />
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}