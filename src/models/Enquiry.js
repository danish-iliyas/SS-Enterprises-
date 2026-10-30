import mongoose from 'mongoose';

export const ENQUIRY_TYPES = ['general', 'product', 'spare_part', 'order', 'contact'];
export const ENQUIRY_STATUSES = ['new', 'in_progress', 'resolved', 'closed'];

const itemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    qty: { type: Number, min: 1, default: 1 },
    price: { type: Number, default: null },
  },
  { _id: false }
);

const enquirySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ENQUIRY_TYPES, default: 'general' },
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 80 },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'],
    },
    message: { type: String, trim: true, maxlength: 1500, default: '' },
    address: { type: String, trim: true, maxlength: 500, default: '' },
    items: [itemSchema],
    total: { type: Number, default: null },
    status: { type: String, enum: ENQUIRY_STATUSES, default: 'new' },
    adminNote: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
