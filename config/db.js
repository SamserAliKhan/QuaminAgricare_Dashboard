// config/db.js
import mongoose from 'mongoose';
import processCsv from '../utils/processCsv.js';
import SoilInfo from '../models/SoilInfo.js';
import HealthStatus from '../models/healthStatus.js';
import SoilData from '../models/soilData.js';

const DATA_PATHS = {
  sensor: "./data/soilinfo.csv",
  health: "./data/healthStatus.csv",
  soil: "./data/soilData.csv",
};

const lastSensorValues = {};
const lastHealthValues = {};
const lastSoilValues = {};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        await Promise.all([
          processCsv(DATA_PATHS.sensor, SoilInfo, lastSensorValues),
          processCsv(DATA_PATHS.health, HealthStatus, lastHealthValues),
          processCsv(DATA_PATHS.soil, SoilData, lastSoilValues),
        ]);
        console.log("All files processed successfully.");
        
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;x