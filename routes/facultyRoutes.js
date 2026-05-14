import express from 'express';
const router = express.Router();
import { getFaculty, getFacultyById, upsertFaculty, deleteFaculty } from '../controllers/facultyController.js';
import { protect, authorize } from '../middleware/auth.js';

router.route('/')
    .get(protect, authorize('admin', 'hod'), getFaculty)
    .post(protect, upsertFaculty);

router.route('/:id')
    .get(protect, getFacultyById)
    .delete(protect, authorize('admin'), deleteFaculty);

export default router;
