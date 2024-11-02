import Farm from '../models/Farm.js';

// GET /api/farm-overview
export const getFarmOverview = async (req, res) => {
    try {
        const farms = await Farm.find();
        res.json(farms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/farm-details
export const addFarmDetails = async (req, res) => {
    const { name, location, size, currentWeather, farmerPhoneNumber } = req.body;
    try {
        const newFarm = new Farm({ name, location, size, currentWeather, farmerPhoneNumber });
        const savedFarm = await newFarm.save();
        res.status(201).json(savedFarm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/farm-details/:farmId
export const updateFarmDetails = async (req, res) => {
    const { farmId } = req.params;
    try {
        const updatedFarm = await Farm.findOneAndUpdate({ farmId }, req.body, { new: true });
        if (!updatedFarm) return res.status(404).json({ message: "Farm not found" });
        res.json(updatedFarm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/farmers/:phoneNumber
export const getFarmerByPhoneNumber = async (req, res) => {
    const { phoneNumber } = req.params;
    try {
        const farms = await Farm.find({ farmerPhoneNumber: phoneNumber });
        if (farms.length === 0) return res.status(404).json({ message: "No farms found for this phone number" });
        res.json(farms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
