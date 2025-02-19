'use client'
import { Download } from 'lucide-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DownloadFile = () => {
    const [userId, setUserId] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const distributor = sessionStorage.getItem('user');
            if (distributor) {
                const parsedDistributor = JSON.parse(distributor);
                setUserId(parsedDistributor._id);
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            handleFetchProviderData();
        }
    }, [userId]);

    const handleFetchProviderData = async () => {
        try {
            const { data } = await axios.get(`https://www.api.upfda.in/api/v1/get_distributor_by_id/${userId}`);
            
            if (data?.data?.fileUploadedByAdmin?.url) {
                setFileUrl(data.data.fileUploadedByAdmin.url);
            }
        } catch (error) {
            console.error("Internal server error", error);
        }
    };

    return (
        <div className="space-y-4 p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Available Downloads</h3>
            <div className="grid grid-cols-1 gap-4">
                {fileUrl ? (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Download className="w-5 h-5 text-[#DE0000]" />
                            <span>Download File</span>
                        </div>
                        <a
                            href={fileUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[#DE0000] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Download
                        </a>
                    </div>
                ) : (
                    <p className="text-gray-500">No file available for download.</p>
                )}
            </div>
        </div>
    );
};

export default DownloadFile;
