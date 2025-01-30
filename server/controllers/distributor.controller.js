const Distributor = require("../models/distributor.model");
const { uploadMultipleImages, uploadSingleImage, uploadFile } = require("../Utils/cloudinary");

exports.createDistributor = async (req, res) => {
    const uploadedImages = [];
    try {
        const {
            distributorEntityName,
            constitutionEntity,
            address,
            city,
            state,
            pincode,
            location,
            gstNo,
            panNo,
            FSSAINo,
            ownerName,
            phoneNo,
            alternatePhoneNo,
            email,
            associatedCompany,
            coverageArea,
            coverageAreaDescription,
            startingYear,
            numberOfCustomers,
            godownArea,
            noOfEmployees,
            noOfVehicles,
            typeOfVehicles,
            monthlyTurnOver,
            channelsOfOperation,
            typesOfOperation,
            businessOperations,
            isERPUsed,
            distributorAssociationName,
            type
        } = req.body;

        const emptyFields = [];
        if (!distributorEntityName) emptyFields.push("distributorEntityName");
        if (!constitutionEntity) emptyFields.push("constitutionEntity");
        if (!address) emptyFields.push("address");
        if (!city) emptyFields.push("city");
        if (!state) emptyFields.push("state");
        if (!pincode) emptyFields.push("pincode");
        if (!location) emptyFields.push("location");
        if (!gstNo) emptyFields.push("gstNo");
        if (!panNo) emptyFields.push("panNo");
        if (!FSSAINo) emptyFields.push("FSSAINo");
        if (!ownerName) emptyFields.push("ownerName");
        if (!phoneNo) emptyFields.push("phoneNo");
        if (!alternatePhoneNo) emptyFields.push("alternatePhoneNo");
        if (!email) emptyFields.push("email");
        if (!associatedCompany) emptyFields.push("associatedCompany");
        if (!coverageArea) emptyFields.push("coverageArea");
        if (!coverageAreaDescription) emptyFields.push("coverageAreaDescription");
        if (!startingYear) emptyFields.push("startingYear");
        if (!numberOfCustomers) emptyFields.push("numberOfCustomers");
        if (!godownArea) emptyFields.push("godownArea");
        if (!noOfEmployees) emptyFields.push("noOfEmployees");
        if (!noOfVehicles) emptyFields.push("noOfVehicles");
        if (!typeOfVehicles) emptyFields.push("typeOfVehicles");
        if (!monthlyTurnOver) emptyFields.push("monthlyTurnOver");
        if (!channelsOfOperation) emptyFields.push("channelsOfOperation");
        if (!typesOfOperation) emptyFields.push("typesOfOperation");
        if (!businessOperations) emptyFields.push("businessOperations");
        if (!isERPUsed) emptyFields.push("isERPUsed");
        if (!distributorAssociationName) emptyFields.push("distributorAssociationName");
        if (!type) emptyFields.push("type");

        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please fill in the following fields: ${emptyFields.join(", ")}`,
            })
        }

        const distributor = await Distributor.create({
            distributorEntityName,
            constitutionEntity,
            address,
            city,
            state,
            pincode,
            location,
            gstNo,
            panNo,
            FSSAINo,
            ownerName,
            phoneNo,
            alternatePhoneNo,
            email,
            associatedCompany,
            coverageArea,
            coverageAreaDescription,
            startingYear,
            numberOfCustomers,
            godownArea,
            noOfEmployees,
            noOfVehicles,
            typeOfVehicles,
            monthlyTurnOver,
            channelsOfOperation,
            typesOfOperation,
            businessOperations,
            isERPUsed,
            distributorAssociationName,
            type
        });

        if (req.files) {
            const { officeAndGodownImage, gstImage, fssaiImage, partner1Image, partner2Image, anyOtherDocImage } = req.files;
            if (officeAndGodownImage) {
                try {
                    const uploadedImages = await uploadMultipleImages(
                        officeAndGodownImage.map((file) => file.path)
                    );

                    const result = uploadedImages.map((image) => {
                        uploadedImages.push(image.public_id);
                        return {
                            url: image.image,
                            public_id: image.public_id
                        }
                    })
                    distributor.officeAndGodownImage = result

                } catch (error) {
                    console.log("Internal server error", error)
                    res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message
                    })
                }
            }

            if (gstImage) {
                try {
                    const uploadImage = await uploadSingleImage(gstImage[0].path)
                    uploadedImages.push(uploadImage.public_id);

                    distributor.gstImage = {
                        url: uploadImage.image,
                        public_id: uploadImage.public_id
                    }

                } catch (error) {
                    console.log("Internal server error", error)
                    res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message
                    })
                }
            }

            if (fssaiImage) {
                try {
                    const uploadImage = await uploadSingleImage(fssaiImage[0].path)
                    uploadedImages.push(uploadImage.public_id);

                    distributor.fssaiImage = {
                        url: uploadImage.image,
                        public_id: uploadImage.public_id
                    }

                } catch (error) {
                    console.log("Internal server error", error)
                    res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message
                    })
                }
            }

            if (partner1Image) {
                try {
                    const uploadImage = await uploadSingleImage(partner1Image[0].path)
                    uploadedImages.push(uploadImage.public_id);

                    distributor.partner1Image = {
                        url: uploadImage.image,
                        public_id: uploadImage.public_id
                    }

                } catch (error) {
                    console.log("Internal server error", error)
                    res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message
                    })
                }
            }

            if (partner2Image) {
                try {
                    const uploadImage = await uploadSingleImage(partner2Image[0].path)
                    uploadedImages.push(uploadImage.public_id);

                    distributor.partner2Image = {
                        url: uploadImage.image,
                        public_id: uploadImage.public_id
                    }

                } catch (error) {
                    console.log("Internal server error", error)
                    res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message
                    })
                }
            }

            if (anyOtherDocImage) {
                try {
                    const uploadImage = await uploadSingleImage(anyOtherDocImage[0].path)
                    uploadedImages.push(uploadImage.public_id);

                    distributor.anyOtherDocImage = {
                        url: uploadImage.image,
                        public_id: uploadImage.public_id
                    }

                } catch (error) {
                    console.log("Internal server error", error)
                    res.status(500).json({
                        success: false,
                        message: "Internal server error",
                        error: error.message
                    })
                }
            }

        }

        await distributor.save();

        return res.status(200).json({
            success: true,
            message: "Distributor created successfully",
            data: distributor
        })

    } catch (error) {
        console.log("Internal server error", error)

        if (uploadedImages.length > 0) {
            try {
                for (const public_id of uploadedImages) {
                    await cloudinary.uploader.destroy(public_id);
                }
                console.log("All uploaded files have been deleted.");
            } catch (deleteError) {
                console.error("Error deleting files:", deleteError.message);
            }
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.getDistributors = async (req, res) => {
    try {
        const distributors = await Distributor.find({});
        if(!distributors) {
            return res.status(404).json({
                success: false,
                message: "Distributors not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Distributors fetched successfully",
            data: distributors
        })
    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

exports.deleteForm = async (req, res) => {
    try {
        const distributor = await Distributor.findByIdAndDelete(req.params.id);
        if(!distributor) {
            return res.status(404).json({
                success: false,
                message: "Distributor not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Distributor deleted successfully",
        })
    } catch (error) {
        console.log("Internal server error", error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}