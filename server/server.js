const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ayuse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }).then(() => console.log('MongoDB connected success'))
   .catch((err) => console.log('Failed to connect to MongoDB', err));
 

   app.post('/api/register', async (req, res) => {
    const { username, email, password, phone, companyName, entityType, dateOfIncorporation, companyRegistrationNumber, registeredAddress, mailingAddress, contactPerson, contactEmail, contactMobile } = req.body;
    try {
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({
          username,
          email,
          password: hashedPassword,
          phone,
          companyName,
          entityType,
          dateOfIncorporation,
          companyRegistrationNumber,
          registeredAddress,
          mailingAddress,
          contactPerson,
          contactEmail,
          contactMobile
       });
       await newUser.save();
       res.status(201).json('User registered');
    } catch (error) {
       res.status(500).json('Error registering user');
    }
 });
 


app.post('/api/login', async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json('Invalid email or password');
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json('Invalid email or password');
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
   } catch (error) {
      res.status(500).json('Error logging in');
   }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
