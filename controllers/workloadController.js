import Workload from '../models/Workload.js';
import Faculty from '../models/Faculty.js';

// @desc    Get all workload entries
// @route   GET /api/workload
// @access  Private/Admin/HOD
export const getWorkloads = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'faculty') {
            const faculty = await Faculty.findOne({ user: req.user._id });
            query = { faculty: faculty._id };
        }
        
        const workloads = await Workload.find(query).populate({
            path: 'faculty',
            populate: { path: 'user', select: 'name email' }
        });
        res.json(workloads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a workload entry
// @route   POST /api/workload
// @access  Private/Faculty
export const createWorkload = async (req, res) => {
    const { teachingHours, nonTeachingDuties, weekNumber, month } = req.body;
    try {
        const faculty = await Faculty.findOne({ user: req.user._id });
        if (!faculty) return res.status(404).json({ message: 'Faculty profile not found' });

        const workload = await Workload.create({
            faculty: faculty._id,
            teachingHours,
            nonTeachingDuties,
            weekNumber,
            month
        });
        res.status(201).json(workload);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update workload status (Approve/Reject)
// @route   PATCH /api/workload/:id
// @access  Private/Admin/HOD
export const updateWorkloadStatus = async (req, res) => {
    try {
        const workload = await Workload.findById(req.params.id);
        if (workload) {
            workload.status = req.body.status || workload.status;
            const updatedWorkload = await workload.save();
            res.json(updatedWorkload);
        } else {
            res.status(404).json({ message: 'Workload entry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
