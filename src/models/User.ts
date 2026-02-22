import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phoneNumber: string;
  lastMessage: string;
  interactionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  lastMessage: {
    type: String,
    default: ''
  },
  interactionCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
