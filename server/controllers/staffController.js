import Staff from '../models/staffSchema.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const handleErrors = (err) => {
  const errors = {};

  // incorrect login credentials
  if (err.message === "Incorrect email" || err.message === "Incorrect password") {
    errors.login = "Incorrect email or password";
  } else if (err.message === "Account is locked") {
    errors.login = "Account is locked";
  } else if(err.message === "Unauthorized") {
    errors.login = "Unauthorized to unlock accounts";
  } else {
    errors.login = "Unknown";
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
const maxAge = 2 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETMESSAGE, { expiresIn: maxAge });
};

// Staff authentication
export const verifyStaff = (req, res) => {
  res.status(200).json({ message: 'verified' })
};

export const staffLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let staff = await Staff.findOne({ email });

    if (!staff) {
      throw Error("Incorrect email");
    }

    if (staff.isLocked) {
      throw Error("Account is locked");
    }

    const auth = await bcrypt.compare(password, staff.password);
    if (!auth) {
      staff.failedLoginAttempts += 1;

      if (staff.failedLoginAttempts >= 3) {
        staff.isLocked = true;
        await staff.save();
        throw Error("Account is locked");
      }

      await staff.save();

      throw Error("Incorrect password");
    }

    staff.failedLoginAttempts = 0;
    await staff.save();

    const token = createToken(staff._id);
    res.cookie("jwt", token, {  maxAge: maxAge * 1000 });
    res.status(200).json({ staff: staff._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err.message);
  }
};

export const staffLogout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out" });
  } catch(err) {
    const errors = handleErrors(err);
    res.status(500).json(errors);
    console.log(err.message);
  }
};

export const getStaff = async (req, res) => {
  try {
    const { id } = req.params
    const staff = await Staff.findById(id, { _id: 1, firstname: 1, lastname: 1, email: 1, isLocked: 1 });
    res.status(200).json(staff)
  } catch(err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
  }
}

export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find({}, { _id: 1, firstname: 1, lastname: 1, email: 1, isLocked: 1 });
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

export const unlockAccount = async (req, res) => {
  try {
    const { email, password, targetEmail } = req.body;

    const employee = await Staff.findOne({ email });

    if (!employee || employee.isLocked) {
      throw Error("Unauthorized");
    }

    const targetStaff = await Staff.findOne({ email: targetEmail });

    if (!targetStaff || !targetStaff.isLocked) {
      throw Error("Account is not locked");
    }

    const auth = await bcrypt.compare(password, employee.password);
    if (!auth) {
      throw Error("Incorrect password");
    }

    targetStaff.isLocked = false;
    targetStaff.failedLoginAttempts = 0;
    await targetStaff.save();

    res.status(200).json({ message: "Account unlocked successfully" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const staff = await Staff.findOne({ email });

    if (!staff) {
      throw Error("Staff not found");
    }

    const auth = await bcrypt.compare(oldPassword, staff.password);
    if (!auth && oldPassword !== process.env.ADMINPASS) {
      throw Error("Current password is incorrect");
    }

    if (oldPassword === newPassword) {
      throw Error("New password must be different from the old password");
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(newPassword)) {
      throw Error("New password invalid");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    staff.password = hashedPassword;
    await staff.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).json(err.message);
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