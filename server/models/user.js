const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   phone: { type: String, required: true },
   companyName: { type: String, required: true },
   entityType: { type: String, enum: ['private', 'partnership'], required: true },
   dateOfIncorporation: { type: Date, required: true },
   companyRegistrationNumber: { type: String, required: true },
   registeredAddress: { type: String, required: true },
   mailingAddress: { type: String, required: true },
   contactPerson: { type: String, required: true },
   contactEmail: { type: String, required: true },
   contactMobile: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
