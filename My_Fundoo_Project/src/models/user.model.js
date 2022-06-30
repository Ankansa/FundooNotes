import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fname: {
      type: String,
      // required: true
    },
    sname: {
      type: String,
      required: true
    },
    mailid: {
      type: String,
      required: true,
      unique: (true)
      
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
