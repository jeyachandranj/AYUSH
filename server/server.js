import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/user';
import Form from './models/form';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';

dotenv.config();

const bcrypt = require("bcrypt");

const app = express();
app.use(cors("*"));
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

mongoose.connect("mongodb://localhost:27017/ayush", {}).then(() => console.log('MongoDB connected to local database'))
   .catch((err) => console.log('Failed to connect to MongoDB', err));


   app.post("/api/register", async (req, res, next) => {
      try {
         const { username, email, password,mobile } = req.body;
         const usernameCheck = await User.findOne({ username });
         if (usernameCheck)
           return res.json({ msg: "Username already used", status: false });
         const emailCheck = await User.findOne({ email });
         if (emailCheck)
           return res.json({ msg: "Email already used", status: false });
         const hashedPassword = await bcrypt.hash(password, 10);
         const user = await User.create({
           email,
           username,
           password: hashedPassword,
           mobile
         });
         delete user.password;
         return res.json({ status: true, user });
       } catch (ex) {
         next(ex);
       }
    });


app.post("/api/login", async (req, res,next) => {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
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
