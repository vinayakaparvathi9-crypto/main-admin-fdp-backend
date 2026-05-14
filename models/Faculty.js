import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    qualification: [{
        degree: String,
        institution: String,
        year: Number
    }],
    experience: [{
        organization: String,
        designation: String,
        duration: String
    }],
    publications: [{
        title: String,
        journal: String,
        year: Number,
        link: String
    }],
    subjectsHandled: [String],
    photo: { type: String, default: 'default-profile.png' },
    workload: {
        teachingHours: { type: Number, default: 0 },
        nonTeachingDuties: [String]
    }
}, { timestamps: true });

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;
