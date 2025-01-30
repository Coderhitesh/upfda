const mongoose = require("mongoose");

const distributorSchema = new mongoose.Schema({
    distributorEntityName : {
        type : String,
    },
    constitutionEntity: {
        type : String,
    },
    address: {
        type : String,
    },
    city: {
        type : String,
    },
    state: {
        type : String,
    },
    pincode: {
        type : String,
    },
    location: {
        type : String,
    },
    gstNo: {
        type : String,
    },
    panNo: {
        type : String,
    },
    FSSAINo: {
        type : String,
    },
    ownerName: [{
        type : String,
    }],
    phoneNo: {
        type : Number,
    },
    alternatePhoneNo: {
        type : Number,
    },
    email: {
        type : String,
    },
    associatedCompany: {
        type : String,
    },
    coverageArea: [{
        type : String,
    }],
    coverageAreaDescription: [{
        type : String,
    }],
    startingYear: {
        type: Date,
        // required: true
    },
    numberOfCustomers: {
        type: Number,
        // required: true
    },
    godownArea: {
        type: Number,
        // required: true
    },
    noOfEmployees: {
        type: Number,
        // required: true
    },
    noOfVehicles: {
        type: Number,
        // required: true
    },
    typeOfVehicles: [{
        type: String,
        // required: true
    }],
    monthlyTurnOver: {
        type: Number,
        // required: true
    },
    channelsOfOperation: [{
        type: String,
        // required: true
    }],
    typesOfOperation: [{
        type: String,
        // required: true
    }],
    businessOperations: [{
        type: String,
        // required: true
    }],
    isERPUsed: {
        type: String,
        // required: true
    },
    distributorAssociationName: {
        type: String,
        // required: true
    },
    officeAndGodownImage:[{
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    }],
    gstImage: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    fssaiImage: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    partner1Image: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    partner2Image: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    anyOtherDocImage: {
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    },
    type: {
        type: String,
        enum: ['Distributor', 'Retailer', 'dealer'],
    }
}, { timestamps: true });

module.exports = mongoose.model("Distributor", distributorSchema);