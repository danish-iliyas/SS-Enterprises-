import mongoose from 'mongoose';

export const BOOKING_STATUSES = ['pending', 'contacted', 'confirmed', 'in_progress', 'completed', 'cancelled'];
export const APPLIANCES = ['ro', 'ac', 'cooler', 'washing_machine', 'refrigerator', 'geyser', 'electrical', 'other'];

const noteSchema = new mongoose.Schema({ text: { type: String, required: true, trim: true } }, { timestamps: true });

const bookingSchema = new mongoose.Schema(
  {
    bookingNo: { type: String, unique: true },
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 80 },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'],
    },
    appliance: { type: String, enum: APPLIANCES, required: [true, 'Select an appliance'] },
    serviceType: { type: String, required: [true, 'Select a service type'], trim: true },
    problem: { type: String, trim: true, maxlength: 1000, default: '' },
    address: { type: String, required: [true, 'Address is required'], trim: true, maxlength: 500 },
    preferredDate: { type: Date },
    preferredTime: { type: String, trim: true, default: '' },
    status: { type: String, enum: BOOKING_STATUSES, default: 'pending' },
    notes: [noteSchema],
    language: { type: String, enum: ['en', 'hi'], default: 'en' },
  },
  { timestamps: true }
);

bookingSchema.pre('validate', function genNo(next) {
  if (!this.bookingNo) {
    const d = new Date();
    const stamp = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, '0')).join('');
    this.bookingNo = `SS${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  }
  next();
});

bookingSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
