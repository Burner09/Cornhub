import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const staffSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "A first name is required"],
    min: 2,
    max: 50,
  },
  lastname: {
    type: String,
    required: [true, "A last name is required"],
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    min: 6,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;