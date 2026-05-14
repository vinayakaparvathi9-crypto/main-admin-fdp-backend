import Faculty from '../models/Faculty.js';
import User from '../models/User.js';

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Private/Admin
export const getFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.find().populate('user', 'name email role');
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single faculty profile
// @route   GET /api/faculty/:id
// @access  Private
export const getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id).populate('user', 'name email role');
        if (faculty) {
            res.json(faculty);
        } else {
            res.status(404).json({ message: 'Faculty not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create/Update faculty profile (Admin version)
// @route   POST /api/faculty
// @access  Private/Admin
export const upsertFaculty = async (req, res) => {
    const {
        _id, // Faculty ID if updating
        name,
        email,
        employeeId,
        designation,
        department,
        qualification,
        experience,
        publications,
        subjectsHandled,
        workload
    } = req.body;

    try {
        if (_id) {
            // Update existing faculty
            const faculty = await Faculty.findById(_id).populate('user');
            if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

            // Update associated user if needed
            if (faculty.user) {
                faculty.user.name = name || faculty.user.name;
                faculty.user.email = email || faculty.user.email;
                await faculty.user.save();
            }

            faculty.employeeId = employeeId || faculty.employeeId;
            faculty.designation = designation || faculty.designation;
            faculty.department = department || faculty.department;
            faculty.qualification = qualification || faculty.qualification;
            faculty.experience = experience || faculty.experience;
            faculty.publications = publications || faculty.publications;
            faculty.subjectsHandled = subjectsHandled || faculty.subjectsHandled;
            faculty.workload = workload || faculty.workload;

            const updatedFaculty = await faculty.save();
            res.json(updatedFaculty);
        } else {
            // Create new faculty
            // 1. Create User
            const userExists = await User.findOne({ email });
            if (userExists) return res.status(400).json({ message: 'User with this email already exists' });

            const user = await User.create({
                name,
                email,
                password: 'password123', // Default password
                role: 'faculty',
                department
            });

            // 2. Create Faculty Profile
            const newFaculty = new Faculty({
                user: user._id,
                employeeId,
                designation,
                department,
                qualification,
                experience,
                publications,
                subjectsHandled,
                workload
            });

            const createdFaculty = await newFaculty.save();
            res.status(201).json(createdFaculty);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete faculty
// @route   DELETE /api/faculty/:id
// @access  Private/Admin
export const deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (faculty) {
            // Also delete the user
            if (faculty.user) {
                await User.findByIdAndDelete(faculty.user);
            }
            await faculty.deleteOne();
            res.json({ message: 'Faculty removed' });
        } else {
            res.status(404).json({ message: 'Faculty not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
