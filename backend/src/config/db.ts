import mongoose from "mongoose";
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Google + Cloudflare DNS force
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const dbConncet = async () => {
    try {
        await mongoose.connect(process.env.DB || "");
        console.log('Database connected successfully!');
    }
    catch (err) {
        console.log('Database connection is not successfull!');
        console.log("err", err);
    }
}