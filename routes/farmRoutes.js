import express from 'express';
import { getFarmOverview, addFarmDetails, updateFarmDetails, getFarmerByPhoneNumber } from '../controllers/farmController.js';

const router = express.Router();

router.get('/farm-overview', getFarmOverview);
router.post('/farm-details', addFarmDetails);
router.put('/farm-details/:farmId', updateFarmDetails);
router.get('/farmers/:key/:value', getFarmerByPhoneNumber);

export default router;
