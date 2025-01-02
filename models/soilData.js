import mongoose from 'mongoose';

const SoilDataSchema = new mongoose.Schema({
    soilType: String,
    pHLevel: Number,
    nutrientLevels: {
        nitrogen: Number,
        phosphorus: Number,
        potassium: Number,
    },
    timestamp: { type: Date, default: Date.now },
});

const SoilData = mongoose.model('SoilData', SoilDataSchema);
export default SoilData;