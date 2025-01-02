import mongoose from 'mongoose';

const SoilInfoSchema = new mongoose.Schema({
    temprature: Number,
    humidity: Number,
    Pressure: String,
    timestamp: { type: Date, default: Date.now },
});

const SoilInfo = mongoose.model('SoilInfo', SoilInfoSchema);
export default SoilInfo;