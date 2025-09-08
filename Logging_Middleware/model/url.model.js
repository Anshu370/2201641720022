import mongoose from 'mongoose';
import clickSchema from './urlClick.model.js';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date, required: true },
  clicks: [clickSchema]
});

export default mongoose.model('ShortUrl', urlSchema);
