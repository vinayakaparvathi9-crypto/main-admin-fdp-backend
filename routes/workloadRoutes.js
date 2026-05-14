import express from 'express';
const router = express.Router();
import { getWorkloads, createWorkload, updateWorkloadStatus } from '../controllers/workloadController.js';
import { protect, authorize } from '../middleware/auth.js';

router.route('/')
    .get(protect, getWorkloads)
    .post(protect, authorize('faculty'), createWorkload);

router.route('/:id')
    .patch(protect, authorize('admin', 'hod'), updateWorkloadStatus);

export default router;
