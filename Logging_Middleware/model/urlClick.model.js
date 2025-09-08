import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  referrer: { type: String, default: "direct" },
  location: { type: String, default: "Unknown" }
}, { _id: false }); // no separate ID for sub-documents

export default clickSchema;
