import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Faculty from './models/Faculty.js';
import Department from './models/Department.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Faculty.deleteMany();
        await Department.deleteMany();

        // Create Departments
        const cseDept = await Department.create({
            name: 'Computer Science',
            code: 'CSE',
            description: 'Dept of CSE',
            budget: 500000,
            stats: { studentCount: 1200, facultyCount: 45, researchPapers: 120 }
        });

        const eceDept = await Department.create({
            name: 'Electronics & Comm.',
            code: 'ECE',
            description: 'Dept of ECE',
            budget: 450000,
            stats: { studentCount: 950, facultyCount: 32, researchPapers: 85 }
        });

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@college.edu',
            password: 'password123',
            role: 'admin',
            department: 'Administration'
        });

        // Create HOD
        const hod = await User.create({
            name: 'Dr. Robert Smith',
            email: 'hod.cse@college.edu',
            password: 'password123',
            role: 'hod',
            department: 'CSE'
        });

        // Create Faculty
        const facultyUser = await User.create({
            name: 'Dr. Sarah Johnson',
            email: 'sarah.j@college.edu',
            password: 'password123',
            role: 'faculty',
            department: 'CSE'
        });

        // Create Faculty Profile
        await Faculty.create({
            user: facultyUser._id,
            employeeId: 'FAC001',
            designation: 'Associate Professor',
            department: 'CSE',
            qualification: [
                { degree: 'PhD', institution: 'MIT', year: 2015 },
                { degree: 'M.Tech', institution: 'IIT Bombay', year: 2010 }
            ],
            experience: [
                { organization: 'ABC Tech', designation: 'Researcher', duration: '3 years' }
            ],
            publications: [
                { title: 'AI in Education', journal: 'IEEE', year: 2022 }
            ],
            subjectsHandled: ['Machine Learning', 'Data Structures'],
            workload: {
                teachingHours: 16,
                nonTeachingDuties: ['Lab In-charge', 'Student Counselor']
            }
        });

        console.log('Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
