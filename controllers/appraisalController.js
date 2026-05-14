import Appraisal from '../models/Appraisal.js';
import Faculty from '../models/Faculty.js';

// @desc    Submit performance appraisal
// @route   POST /api/appraisal
// @access  Private/Faculty
export const submitAppraisal = async (req, res) => {
    const { academicYear, apiScore, researchScore, studentFeedback, comments } = req.body;
    try {
        const faculty = await Faculty.findOne({ user: req.user._id });
        if (!faculty) return res.status(404).json({ message: 'Faculty profile not found' });

        const appraisal = await Appraisal.create({
            faculty: faculty._id,
            academicYear,
            apiScore,
            researchScore,
            studentFeedback,
            comments,
            status: 'submitted'
        });
        res.status(201).json(appraisal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all appraisals for review
// @route   GET /api/appraisal
// @access  Private/Admin/HOD
export const getAppraisals = async (req, res) => {
    try {
        const appraisals = await Appraisal.find().populate({
            path: 'faculty',
            populate: { path: 'user', select: 'name email' }
        });
        res.json(appraisals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appraisal status (Review)
// @route   PATCH /api/appraisal/:id
// @access  Private/Admin/HOD
export const reviewAppraisal = async (req, res) => {
    try {
        const appraisal = await Appraisal.findById(req.params.id);
        if (appraisal) {
            appraisal.status = req.body.status || appraisal.status;
            appraisal.comments = req.body.comments || appraisal.comments;
            appraisal.evaluator = req.user._id;
            const updated = await appraisal.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Appraisal not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
