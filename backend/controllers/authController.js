import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Function to validate required fields
const validateRequiredFields = (fields, requiredFields) => {
  for (const field of requiredFields) {
    if (!fields[field]) {
      return `${field} is required`;
    }
  }
  return null;
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check for required fields
  const errorMessage = validateRequiredFields(req.body, ['name', 'email', 'password']);
  if (errorMessage) {
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.status(201).json({ token, user: { name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Check for required fields
    const errorMessage = validateRequiredFields(req.body, ['email', 'password']);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ 
        message: 'Login successful',
        token, 
        user: { name: user.name, email: user.email, role: user.role } 
      });
    } catch (err) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

export { register, login };
