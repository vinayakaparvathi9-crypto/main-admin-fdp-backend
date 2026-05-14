import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    student: { type: String, required: true }, // Could be a Student model ID later
    course: { type: String, required: true },
    academicYear: { type: String, required: true },
    semester: { type: String, required: true },
    ratings: {
        teachingStyle: { type: Number, min: 1, max: 5, required: true },
        punctuality: { type: Number, min: 1, max: 5, required: true },
        clarity: { type: Number, min: 1, max: 5, required: true },
        responsiveness: { type: Number, min: 1, max: 5, required: true }
    },
    averageRating: { type: Number },
    comments: { type: String },
    anonymous: { type: Boolean, default: true }
}, { timestamps: true });

// Calculate average rating before saving
feedbackSchema.pre('save', function(next) {
    const r = this.ratings;
    this.averageRating = (r.teachingStyle + r.punctuality + r.clarity + r.responsiveness) / 4;
    next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
