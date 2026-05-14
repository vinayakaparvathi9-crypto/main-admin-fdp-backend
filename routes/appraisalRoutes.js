import express from 'express';
const router = express.Router();
import { submitAppraisal, getAppraisals, reviewAppraisal } from '../controllers/appraisalController.js';
import { protect, authorize } from '../middleware/auth.js';

router.route('/')
    .get(protect, authorize('admin', 'hod'), getAppraisals)
    .post(protect, authorize('faculty'), submitAppraisal);

router.route('/:id')
    .patch(protect, authorize('admin', 'hod'), reviewAppraisal);

export default router;
