import mongoose from 'mongoose';

const cricketBookingSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  date: { type: Number, required: true },
  slots: [{ type: Number, required: true }],
  name: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: { type: String, required: true, enum: ['Cash', 'Online'] },
  paymentStatus: { type: String, required: true, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  createdAt: { type: Date, default: Date.now },
});

cricketBookingSchema.index({ year: 1, month: 1, date: 1 });

export default mongoose.model('CricketBooking', cricketBookingSchema);
