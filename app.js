import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import farmRoutes from './routes/farmRoutes.js';

dotenv.config();
const app = express();

connectDB();
app.use(express.json());

app.use('/api/farms', farmRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
