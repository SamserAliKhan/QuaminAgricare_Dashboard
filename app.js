import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import farmRoutes from './routes/farmRoutes.js';
import SoilInfo from './models/SoilInfo.js';
import HealthStatus from './models/healthStatus.js';
import SoilData from './models/soilData.js';
import processCsv from './utils/processCsv.js';
dotenv.config();
const app = express();
const DATA_PATHS = {
  sensor: "./data/soilinfo.csv",
  health: "./data/healthStatus.csv",
  soil: "./data/soilData.csv",
};
const lastSensorValues = {};
const lastHealthValues = {};
const lastSoilValues = {};
connectDB();
app.use(express.json());

app.use('/api/farms', farmRoutes);
mongoose.connection.once("open", async () => {
    console.log("MongoDB connection is ready.");
  
    Promise.all([
      processCsv(DATA_PATHS.sensor, SoilInfo, lastSensorValues),
      processCsv(DATA_PATHS.health, HealthStatus, lastHealthValues),
      processCsv(DATA_PATHS.soil, SoilData, lastSoilValues),
    ])
      .then((results) => {
        console.log("All files processed:", results);
      })
      .catch((error) => console.error("Error processing files:", error));
  });
  
  // GET endpoint for the forntend returns the last pushed data from the tables to display
  const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  //temp,humidity,pressure
  app.get(
    "/latest-soilinfo",
    asyncHandler(async (req, res) => {
      const latestSoilInfo = await SoilInfo.findOne().sort({ timestamp: -1 });
      if (latestSoilInfo) {
        res.status(200).json(latestSoilInfo);
      } else {
        res.status(404).json({ message: "No SoilInfo data found" });
      }
    })
  );
  //healthStatus,recommendation
  app.get(
    "/latest-healthstatus",
    asyncHandler(async (req, res) => {
      const latestHealthStatus = await HealthStatus.findOne().sort({
        timestamp: -1,
      });
      if (latestHealthStatus) {
        res.status(200).json(latestHealthStatus);
      } else {
        res.status(404).json({ message: "No HealthStatus data found" });
      }
    })
  );
  //soiltype,PH,nutrientlevels(object)
  app.get(
    "/latest-soildata",
    asyncHandler(async (req, res) => {
      const latestSoilData = await SoilData.findOne().sort({ timestamp: -1 });
      if (latestSoilData) {
        res.status(200).json(latestSoilData);
      } else {
        res.status(404).json({ message: "No SoilData found" });
      }
    })
  );
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
