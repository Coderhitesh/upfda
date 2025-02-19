'use client'
import axios from 'axios';
import { Upload } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const UploadFile = () => {
    const [fileUploadedByDistributor, setFileUploadedByDistributor] = useState(null);
    const [userId, setUserId] = useState(null);
    const  [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const distributor = sessionStorage.getItem('user');
            if (distributor) {
                const ParseDistributor = JSON.parse(distributor);
                setUserId(ParseDistributor._id);
            }
        }
    }, []);

    const handleFileChange = (e) => {
        setFileUploadedByDistributor(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!fileUploadedByDistributor || !userId) {
            console.log("No file selected or user not found");
            return;
        }

        const formData = new FormData();
        formData.append('fileUploadedByDistributor', fileUploadedByDistributor);

        try {
            const res = await axios.put(
                `https://www.api.upfda.in/api/v1/update_file_By_provider/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            toast.success('PDF Uploaded Successfully');
            console.log(res.data);
            setLoading(false)
        } catch (error) {
            console.log("Internal server error", error);
            toast.error(error?.response?.data?.message || 'Something went wrong');
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="text-center py-12">
            <div className="max-w-xl mx-auto">
                <label htmlFor="fileInput">
                <Upload className="w-12 h-12 text-[#DE0000] mx-auto mb-4" />
                </label>
                <h3 className="text-lg font-semibold mb-2">Upload PDF File</h3>
                <p className="text-gray-500 mb-4">
                    Select and upload a PDF file for distribution
                </p>
                <input
                
                    type="file"
                    id='fileInput'
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-[#DE0000] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    {loading ? 'Uploading...' : 'Upload File'}
                </button>
            </div>
        </div>
    );
};

export default UploadFile;
