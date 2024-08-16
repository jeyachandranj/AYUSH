const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    entityType: { type: String, enum: ['private', 'partnership'], required: true },
    dateOfIncorporation: { type: Date, required: true },
    companyRegistrationNumber: { type: String, required: true },
    registeredAddress: { type: String, required: true },
    contactPerson: { type: String, required: true },
    manufacturingUnitAddress: { type: String, required: true },
    productCategory: { type: String, required: true },
    productionCapacity: { type: String, required: true },
    gmpCertificate: { type: String, required: true },
    coppCertificate: { type: String, required: true },
    ayushLicenseCertificate: { type: String, required: true },
    manufacturingLicense: { type: String, required: true },
    companyIncorporationCertificate: { type: String, required: true },
    panCard: { type: String, required: true },
    gstRegistrationNumber: { type: String, required: true },
    ieCode: { type: String, required: true },
    capitalInvestment: { type: Number, required: true },
    bankAccountDetails: { type: String, required: true },
});

module.exports = mongoose.model('form', formSchema);
