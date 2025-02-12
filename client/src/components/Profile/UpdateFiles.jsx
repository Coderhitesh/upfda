'use client'
import React, { useEffect, useState } from 'react'
import { Upload, X } from "lucide-react";
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateFiles = () => {
    // const distributor = sessionStorage.getItem('user');
    // const ParseDistributor = JSON.parse(distributor);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState(null)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const distributor = sessionStorage.getItem('user');
            if (distributor) {
                const parsedDistributor = JSON.parse(distributor);
                setUserId(parsedDistributor._id);
            }
        }
    }, []);
    const [formData, setFormData] = useState({
        files: {
            officeAndGodownImage: [],
            gstImage: null,
            fssaiImage: null,
            partner1Image: null,
            partner2Image: null,
            anyOtherDocImage: null,
        },
    });

    useEffect(() => {
        const handleFetchDistributor = async () => {
            if (!userId) return;
            try {
                const { data } = await axios.get(`https://www.test.blueaceindia.com/api/v1/get_distributor_by_id/${userId}`);
                const distributorData = data.data;
                setRole(distributorData?.type)

                setFormData({
                    files: {
                        officeAndGodownImage: distributorData.officeAndGodownImage || [],
                        gstImage: distributorData.gstImage || null,
                        fssaiImage: distributorData.fssaiImage || null,
                        partner1Image: distributorData.partner1Image || null,
                        partner2Image: distributorData.partner2Image || null,
                        anyOtherDocImage: distributorData.anyOtherDocImage || null,
                    },
                });
            } catch (error) {
                console.log("Internal server error", error);
            }
        };

        handleFetchDistributor();
    }, [userId]);


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
            const response = await axios.put(`https://www.test.blueaceindia.com/api/v1/update_profile/${userId}`, formDataToSend);

            // const data = await response.json();
            const data = response.data;

            if (data.success) {
                toast.success(data.message || "Files updated successfully!");
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
    const handleImageUpload = async (event, fileType) => {
        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

            // Handling officeAndGodownImage (Allowing multiple images, max 5)
            if (fileType === "officeAndGodownImage") {
                if (formData.files[fileType]?.length < 5) {
                    const updatedFiles = {
                        ...formData.files,
                        [fileType]: Array.isArray(formData.files[fileType])
                            ? [...formData.files[fileType], compressedFile]
                            : [compressedFile],
                    };
                    setFormData({ ...formData, files: updatedFiles });
                } else {
                    alert("You can upload a maximum of 5 images for Office and Godown.");
                }
            } else {
                // Handling other single file uploads
                const updatedFiles = {
                    ...formData.files,
                    [fileType]: compressedFile,
                };
                setFormData({ ...formData, files: updatedFiles });
            }

        } catch (error) {
            console.log(error);
            alert("Error while compressing the image.");
        }
    };

    const removeFile = (field, index) => {
        if (field === "officeAndGodownImage") {
            setFormData((prev) => ({
                ...prev,
                files: {
                    ...prev.files,
                    [field]: prev.files[field].filter((_, i) => i !== index),
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                files: {
                    ...prev.files,
                    [field]: null,
                },
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Upload</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        Please upload all required documents in PDF or image format
                    </p>

                    {/* Office and Godown Images */}
                    {/* Office and Godown Images */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Office and Godown Images (Up to 5)
                        </label>

                        {/* Show existing images */}
                        <div className="flex flex-wrap gap-3">
                            {formData.files.officeAndGodownImage?.map((file, index) => (
                                <div key={index} className="relative w-24 h-24">
                                    <img src={file.url} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
                                    <button
                                        type="button"
                                        onClick={() => removeFile("officeAndGodownImage", index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* File Upload */}
                        <div className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <label className="cursor-pointer text-[#CF2732] hover:text-[#CF2732]">
                                    <span>Upload files</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, "officeAndGodownImage")}
                                        className="sr-only"
                                    />
                                </label>
                                <p className="text-xs text-gray-500">PNG, JPG up to 1MB each</p>
                            </div>
                        </div>
                    </div>

                    {role === 'Association' ? (
                        <>
                            {[{ name: "gstImage", label: "Registration Certificate" },
                            // { name: "fssaiImage", label: "FSSAI License" },
                            { name: "partner1Image", label: "Photo of Executive Head (General Secretary) " },
                            { name: "partner2Image", label: "Photo of Leader of the organization (President / Chairman)" },
                            { name: "anyOtherDocImage", label: "Any Other Document" }]
                                .map((field) => (
                                    <div key={field.name} className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label}
                                        </label>

                                        {/* Show existing image */}
                                        {formData.files[field.name] && (
                                            <div className="relative w-24 h-24 mb-2">
                                                <img src={formData.files[field.name].url} alt={field.label} className="w-full h-full object-cover rounded-md" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(field.name)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Upload File */}
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <label className="cursor-pointer text-[#CF2732] hover:text-[#c02832]">
                                                    <span>Upload file</span>
                                                    <input
                                                        type="file"
                                                        accept=".pdf,image/*"
                                                        onChange={(e) => handleImageUpload(e, field.name)}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="text-xs text-gray-500">Image up to 1MB</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </>
                    ) : (
                        <>
                            {/* Single File Uploads */}
                            {[{ name: "gstImage", label: "GST Certificate" },
                            { name: "fssaiImage", label: "FSSAI License" },
                            { name: "partner1Image", label: "Partner 1 ID Proof" },
                            { name: "partner2Image", label: "Partner 2 ID Proof" },
                            { name: "anyOtherDocImage", label: "Any Other Document" }]
                                .map((field) => (
                                    <div key={field.name} className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label}
                                        </label>

                                        {/* Show existing image */}
                                        {formData.files[field.name] && (
                                            <div className="relative w-24 h-24 mb-2">
                                                <img src={formData.files[field.name].url} alt={field.label} className="w-full h-full object-cover rounded-md" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(field.name)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Upload File */}
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <label className="cursor-pointer text-[#CF2732] hover:text-[#c02832]">
                                                    <span>Upload file</span>
                                                    <input
                                                        type="file"
                                                        accept=".pdf,image/*"
                                                        onChange={(e) => handleImageUpload(e, field.name)}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="text-xs text-gray-500">Image up to 1MB</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </>
                    )}

                </div>

                <div className="flex justify-between mt-8">
                    <button
                        type="submit"
                        className="bg-[#CF2732] text-white px-6 py-2 rounded-md hover:bg-[#CF2732] focus:outline-none focus:ring-2 focus:ring-[#CF2732] focus:ring-offset-2"
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UpdateFiles
