"use client";

import { Upload, X } from "lucide-react";
import imageCompression from 'browser-image-compression';

const StepTwo = ({ formData, setFormData, setStep, isLoading }) => {
    // Handle image upload and compression
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
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Upload</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Please upload all required documents in PDF or image format
                </p>

                {/* Office and Godown Images */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Office and Godown Images (Up to 5) upload one by one
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center flex flex-col items-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#CF2732] hover:text-[#CF2732] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#CF2732]">
                                    <span>Upload files</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, "officeAndGodownImage")}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG up to 1MB each</p>
                        </div>
                    </div>
                    {formData.files.officeAndGodownImage?.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {formData.files.officeAndGodownImage.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                                >
                                    <span className="text-sm text-gray-600">{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFile("officeAndGodownImage", index)}
                                        className="text-[#CF2732] hover:text-[#CF2732]"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Single File Uploads */}
                {[{ name: "gstImage", label: "GST Certificate" }, { name: "fssaiImage", label: "FSSAI License" },
                { name: "partner1Image", label: "Partner 1 ID Proof" }, { name: "partner2Image", label: "Partner 2 ID Proof" },
                { name: "anyOtherDocImage", label: "Any Other Document" }]
                    .map((field) => (
                        <div key={field.name} className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {field.label}
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center flex flex-col items-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#CF2732] hover:text-[#c02832] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#CF2732]">
                                            <span>Upload file</span>
                                            <input
                                                type="file"
                                                accept=".pdf,image/*"
                                                onChange={(e) => handleImageUpload(e, field.name)}
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">Image up to 1MB</p>
                                </div>
                            </div>
                            {formData.files[field.name] && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                        <span className="text-sm text-gray-600">
                                            {formData.files[field.name].name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(field.name)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>

            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-600 px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#CF2732] focus:ring-offset-2"
                >
                    Previous Step
                </button>
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

export default StepTwo;