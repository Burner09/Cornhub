import Staff from '../models/staffSchema.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const handleErrors = (err) => {
  const errors = {};

  // incorrect login credentials
  if ( err.message === "Incorrect email" || err.message === "Incorrect password") {
    errors.login = "Incorrect email or password";
    return errors;
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("staff validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      if (properties) {
        errors[properties.path] = properties.message;
      }
    });
  }

  return errors;
};

// jwt token creation;
const maxAge = 30 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETMESSAGE, { expiresIn: maxAge });
};

// Staff authentication
export const staffLogout = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.status(200).json({ message: "Logged out" });
};
export const verifyStaff = (req, res) => {
  res.status(200).json({ message: 'verified' })
};

export const staffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email }, { _id: 1, password: 1 });

    if (staff) {
      const auth = await bcrypt.compare(password, staff.password);
      if (!auth) {
        throw Error("Incorrect password");
      }
    } else {
      throw Error("Incorrect email");
    }

    const token = createToken(staff._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ staff: staff._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err.message);
  }
};
export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find({}, { _id: 1, firstname: 1, lastname: 1, email: 1 });
    res.status(200).json(staff)
  } catch(err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
  }
}

export const createStaff = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body)
    const staff = await Staff.create({
      firstname,
      lastname,
      email,
      password
    });

    const token = createToken(staff._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ staff: staff._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
  }
};