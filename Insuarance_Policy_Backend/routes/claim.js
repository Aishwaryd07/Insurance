import express from "express";
import { createClaim, processClaim, myClaims, allClaims, claimDetails } from "../controllers/claim.js";
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Route for creating a new claim
router.post('/new', upload.array('photos', 5), createClaim);

// Route for processing a claim //admin
router.put('/process', processClaim);

router.get('/my', myClaims); 

// Route for retrieving all claims (for admins)
router.get('/all', allClaims); 

// Route for getting claim details //user
router.get('/:id', claimDetails); 

export default router;
