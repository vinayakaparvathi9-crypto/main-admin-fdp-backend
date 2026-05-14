import mongoose from 'mongoose';

const workloadSchema = new mongoose.Schema({
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    date: { type: Date, default: Date.now },
    teachingHours: { type: Number, required: true },
    nonTeachingDuties: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    weekNumber: { type: Number, required: true },
    month: { type: String, required: true }
}, { timestamps: true });

const Workload = mongoose.model('Workload', workloadSchema);
export default Workload;
