import express from 'express';
const router = express.Router();
import { markAttendance, getAttendanceLogs } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/auth.js';

router.route('/')
    .get(protect, authorize('admin', 'hod'), getAttendanceLogs)
    .post(protect, markAttendance);

export default router;
