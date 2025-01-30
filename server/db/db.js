const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {

    try {
        const mongoLink = process.env.MONGO_URI || 'mongodb+srv://hiteshy468:kwSMmYRKFRAE2MW1@cluster0.xew1w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        const conn = await mongoose.connect(mongoLink);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;