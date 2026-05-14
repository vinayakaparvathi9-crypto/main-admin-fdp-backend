import Department from '../models/Department.js';
import Faculty from '../models/Faculty.js';

// @desc    Get all departments with basic stats
// @route   GET /api/departments
// @access  Private
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('hod', 'name email');
        
        // Dynamic stats from Faculty model
        const updatedDepartments = await Promise.all(departments.map(async (dept) => {
            const facultyCount = await Faculty.countDocuments({ department: dept.name });
            return { ...dept._doc, facultyCount };
        }));

        res.json(updatedDepartments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new department
// @route   POST /api/departments
// @access  Private/Admin
export const createDepartment = async (req, res) => {
    const { name, code, description, budget, hod } = req.body;
    try {
        const deptExists = await Department.findOne({ code });
        if (deptExists) return res.status(400).json({ message: 'Department code already exists' });

        const department = await Department.create({
            name,
            code,
            description,
            budget,
            hod
        });
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
