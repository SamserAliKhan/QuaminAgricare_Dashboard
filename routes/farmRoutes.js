import express from 'express';
import {
  getFarmOverview,
  addFarmDetails,
  updateFarmDetails,
  getFarmerByPhoneNumber,
  deleteFarm,
} from "../controllers/farmController.js";

const router = express.Router();

router.get('/farmInfo', getFarmOverview);
router.post('/addFarm', addFarmDetails);
router.put('/farmUpdate/:farmId', updateFarmDetails);
router.get('/farmerInfo/:key/:value', getFarmerByPhoneNumber);
router.delete('/deleteFarm/:farmId', deleteFarm);

export default router;
