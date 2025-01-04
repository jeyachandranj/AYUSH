const mongoose = require("mongoose");
const Certificate = require("../models/Certificates"); // Import the model

exports.getCertificateData = async (req, res) => {
  const { certificateNumber, certificateType } = req.body;

  if (!certificateNumber || !certificateType) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    // Determine which collection to query based on certificateType
    let collectionName;
    switch (certificateType) {
      case "AYUSH":
        collectionName = "AYUSH"; // Replace with your collection name
        break;
      case "MANUFACTURING":
        collectionName = "ManufacturingLicense"; // Replace with your collection name
        break;
      case "COMPANY":
        collectionName = "CompanyIncorporation"; // Replace with your collection name
        break;
      case "COPP":
        collectionName = "COPP";
        break;
      case "GMP":
        collectionName = "GMP";
        break;
      default:
        return res.status(400).json({ error: "Invalid certificateType" });
    }

    // Query the collection
    const collection = mongoose.connection.collection(collectionName);
    const data = await collection.findOne({ certificateNumber });

    if (!data) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching certificate data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
