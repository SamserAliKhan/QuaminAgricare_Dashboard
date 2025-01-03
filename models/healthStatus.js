import mongoose from 'mongoose';

const HealthStatusSchema = new mongoose.Schema({
    healthStatus: String,
    recommendations: String,
    timestamp: { type: Date, default: Date.now },
});

const HealthStatus = mongoose.model('HealthStatus', HealthStatusSchema);
export default HealthStatus;