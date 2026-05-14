import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema({
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    title: { type: String, required: [true, 'Title is required'], trim: true },
    journal: { type: String, required: [true, 'Journal/Conference name is required'] },
    year: { type: Number, required: true },
    doi: { type: String, unique: true, sparse: true },
    type: { type: String, enum: ['journal', 'conference', 'book', 'patent'], default: 'journal' },
    status: { type: String, enum: ['published', 'accepted', 'under-review'], default: 'published' },
    url: { type: String },
    citations: { type: Number, default: 0 }
}, { timestamps: true });

const Publication = mongoose.model('Publication', publicationSchema);
export default Publication;
