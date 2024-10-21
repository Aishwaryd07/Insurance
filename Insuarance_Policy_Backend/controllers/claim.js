import Claim from '../models/claim.js';
import { ErrorHandler } from '../middlewares/error.js';

// Create Claim
export const createClaim = async (req, res, next) => {
  try {
    const { userId, policyId, claimType, description } = req.body;

    if (!req.files || req.files.length === 0) {
      return next(new ErrorHandler("Please upload at least one photo", 400));
    }

    const photoUrls = req.files.map(file => file.path);

    const claim = await Claim.create({
      userId,
      policyId,
      claimType,
      description,
      photos: photoUrls,
    });

    return res.status(201).json({
      success: true,
      message: "Claim created successfully",
      claim,
    });
  } catch (error) {
    next(error);
  }
};

// Process Claim
export const processClaim = async (req, res, next) => {
  try {
    const { id, status } = req.body;

    const claim = await Claim.findById(id);
    if (!claim) {
      return next(new ErrorHandler("Claim not found", 404));
    }

    claim.status = status;
    await claim.save();

    return res.status(200).json({
      success: true,
      message: "Claim processed successfully",
      claim,
    });
  } catch (error) {
    next(error);
  }
};

// Other functions...
export const myClaims = async (req, res, next) => {
  try {
      const claims = await Claim.find({ userId: req.userId });
      return res.status(200).json({ success: true, claims });
  } catch (err) {
      next(err);
  }
};

export const allClaims = async (req, res, next) => {
  try {
      const claims = await Claim.find();
      return res.status(200).json({ success: true, claims });
  } catch (err) {
      next(err);
  }
};

export const claimDetails = async (req, res, next) => {
  try {
      const { id } = req.params;

      const claim = await Claim.findById(id);
      if (!claim) {
          return next(new ErrorHandler("Claim not found", 404));
      }

      return res.status(200).json({ success: true, claim });
  } catch (err) {
      next(err);
  }
};