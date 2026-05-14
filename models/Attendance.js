import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['present', 'absent', 'leave'], default: 'present' },
    checkIn: { type: String },
    checkOut: { type: String },
    remarks: { type: String }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
