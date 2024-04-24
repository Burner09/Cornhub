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
const maxAge = 8 * 60 * 60;
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

export const getStaff = async (req, res) => {
  try {
    const { id } = req.params
    const staff = await Staff.findById(id, { _id: 1, firstname: 1, lastname: 1, email: 1 });
    res.status(200).json(staff)
  } catch(err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
  }
}

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

    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password)) {
      throw Error("Password invalid");
    }

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: 'Staff with this email already exists' });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStaff = new Staff({ firstname, lastname, email, password: hashedPassword });

    await newStaff.save();

    res.status(201).json({ message: 'Staff created successfully' });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err.message);
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password } = req.body;

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    if (password) {
      const auth = await bcrypt.compare(password, staff.password);
      if (!auth && password !== process.env.ADMINPASS) {
        throw Error("Incorrect password");
      }
    }

    staff.firstname = firstname;
    staff.lastname = lastname;
    staff.email = email;

    await staff.save();

    res.status(200).json({ message: 'Staff updated successfully' });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err.message);
  }
};

export const deleteStaff = async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedStaff = await Staff.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};