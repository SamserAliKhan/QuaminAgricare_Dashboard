// main.js (or your main application file)
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import farmRoutes from './routes/farmRoutes.js';
import SoilInfo from './models/SoilInfo.js';
import HealthStatus from './models/healthStatus.js';
import SoilData from './models/soilData.js';

dotenv.config();
const app = express();

connectDB(); // Call the connectDB function to establish the connection

app.use(express.json());
app.use('/api/farms', farmRoutes);

// GET endpoint for the frontend returns the last pushed data from the tables to display
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

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

app.get(
  "/latest-healthstatus",
  asyncHandler(async (req, res) => {
    const latestHealthStatus = await HealthStatus.findOne().sort({ timestamp: -1 });
    if (latestHealthStatus) {
      res.status(200).json(latestHealthStatus);
    } else {
      res.status(404).json({ message: "No HealthStatus data found" });
    }
  })
);

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