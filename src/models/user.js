import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  totalMessages: {
    type: Number,
    default: 0,
  },
  dailyMessages: {
    type: Number,
    default: 0,
  },
});

export const User = mongoose.model('User', userSchema);
