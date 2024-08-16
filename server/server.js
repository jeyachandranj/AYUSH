const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/user');
const Form = require('./models/form');
const multer = require('multer');
const path = require('path');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost:27017/ayush", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }).then(() => console.log('MongoDB connected to local database'))
   .catch((err) => console.log('Failed to connect to MongoDB', err));
 

app.post('/api/register', async (req, res) => {
   const { username, email, password, phone } = req.body;
   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, phone });
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


app.post('/api/form', upload.fields([
   { name: 'gmpCertificate', maxCount: 1 },
   { name: 'coppCertificate', maxCount: 1 },
   { name: 'ayushLicenseCertificate', maxCount: 1 },
   { name: 'manufacturingLicense', maxCount: 1 },
   { name: 'companyIncorporationCertificate', maxCount: 1 },
   { name: 'panCard', maxCount: 1 },
   { name: 'gstRegistrationNumber', maxCount: 1 },
   { name: 'ieCode', maxCount: 1 },
]), async (req, res) => {
   const {
       companyName, entityType, dateOfIncorporation, companyRegistrationNumber,
       registeredAddress, contactPerson, manufacturingUnitAddress, productCategory,
       productionCapacity, capitalInvestment, bankAccountDetails
   } = req.body;

   try {
       const newForm = new Form({
           companyName,
           entityType,
           dateOfIncorporation,
           companyRegistrationNumber,
           registeredAddress,
           contactPerson,
           manufacturingUnitAddress,
           productCategory,
           productionCapacity,
           gmpCertificate: req.files['gmpCertificate'][0].path,
           coppCertificate: req.files['coppCertificate'][0].path,
           ayushLicenseCertificate: req.files['ayushLicenseCertificate'][0].path,
           manufacturingLicense: req.files['manufacturingLicense'][0].path,
           companyIncorporationCertificate: req.files['companyIncorporationCertificate'][0].path,
           panCard: req.files['panCard'][0].path,
           gstRegistrationNumber: req.files['gstRegistrationNumber'][0].path,
           ieCode: req.files['ieCode'][0].path,
           capitalInvestment,
           bankAccountDetails
       });

       await newForm.save();
       res.status(201).json('Registration successful');
   } catch (error) {
       res.status(500).json('Error registering company');
   }
});


const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
