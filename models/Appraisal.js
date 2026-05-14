import mongoose from 'mongoose';

const appraisalSchema = new mongoose.Schema({
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    academicYear: { type: String, required: true },
    apiScore: { type: Number, default: 0 },
    studentFeedback: { type: Number, min: 1, max: 5 },
    researchScore: { type: Number, default: 0 },
    evaluationDate: { type: Date, default: Date.now },
    evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['draft', 'submitted', 'reviewed'], default: 'draft' },
    comments: { type: String }
}, { timestamps: true });

const Appraisal = mongoose.model('Appraisal', appraisalSchema);
export default Appraisal;
