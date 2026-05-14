import Attendance from '../models/Attendance.js';
import Faculty from '../models/Faculty.js';

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Private/Faculty
export const markAttendance = async (req, res) => {
    const { status, checkIn, checkOut, remarks } = req.body;
    try {
        const faculty = await Faculty.findOne({ user: req.user._id });
        if (!faculty) return res.status(404).json({ message: 'Faculty profile not found' });

        const today = new Date().setHours(0,0,0,0);
        const existing = await Attendance.findOne({ 
            faculty: faculty._id, 
            date: { $gte: today } 
        });

        if (existing) {
            existing.checkOut = checkOut || existing.checkOut;
            existing.remarks = remarks || existing.remarks;
            await existing.save();
            return res.json(existing);
        }

        const attendance = await Attendance.create({
            faculty: faculty._id,
            status,
            checkIn,
            remarks
        });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get attendance logs
// @route   GET /api/attendance
// @access  Private/Admin/HOD
export const getAttendanceLogs = async (req, res) => {
    try {
        const logs = await Attendance.find().populate({
            path: 'faculty',
            populate: { path: 'user', select: 'name email' }
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
