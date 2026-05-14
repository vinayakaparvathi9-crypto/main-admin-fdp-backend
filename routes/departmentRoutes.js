import express from 'express';
const router = express.Router();
import { getDepartments, createDepartment } from '../controllers/departmentController.js';
import { protect, authorize } from '../middleware/auth.js';

router.route('/')
    .get(protect, getDepartments)
    .post(protect, authorize('admin'), createDepartment);

export default router;
