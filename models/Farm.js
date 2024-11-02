import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const farmSchema = new mongoose.Schema({
    farmId: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    size: { type: Number, required: true },
    currentWeather: { type: String },
    farmerPhoneNumber: { type: String, required: true, match: /^\d{10}$/ }
}, {
    timestamps: true
});

const Farm = mongoose.model('Farm', farmSchema);
export default Farm;
