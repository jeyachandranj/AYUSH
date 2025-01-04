const Investor = require("../models/Investor");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.putInvestorData = async (req, res) => {
  const { step, data } = req.body;
  console.log(req.body);

  if (!step || !data) {
    return res.status(400).json({ message: "Step and data are required" });
  }

  // Ensure userId is available from the request (auth middleware should add this)
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Validate and convert userId to ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  const userObjectId = mongoose.Types.ObjectId(userId);

  try {
    if (step === 1) {
      const {
        name,
        interest,
        startupState,
        budget,
        investmentCategorySector,
        panCard,
        brief,
      } = data.details;
      const network = data.network;
      let investor = await Investor.findOne({ userId: userObjectId });
      if (!investor) {
        investor = new Investor({ userId: userObjectId });
      }

      investor.network = network;
      investor.name = name;
      investor.interest = interest;
      investor.startupState = startupState;
      investor.budget = budget;
      investor.investmentCategorySector = investmentCategorySector;
      investor.panCard = panCard;
      investor.brief = brief;

      await investor.save();
      return res
        .status(200)
        .json({ message: "Step 1 data saved successfully", investor });
    }

    if (step === 2) {
      const { addressLine, state, district, pincode, linkedin, website } =
        data.address;

      let investor = await Investor.findOne({ userId: userObjectId });
      if (!investor) {
        return res.status(404).json({ message: "Investor not found" });
      }

      // Update investor with step 2 data
      investor.addressLine = addressLine;
      investor.state = state;
      investor.district = district;
      investor.pincode = pincode;
      investor.linkedin = linkedin;
      investor.website = website;

      await investor.save();
      return res
        .status(200)
        .json({ message: "Step 2 data saved successfully", investor });
    }
    if (step === 3) {
      let user = await User.findOne({ _id: userObjectId });

      user.role = "investor";
      await user.save();

      console.log("Hello");
      console.log(user);
      let investor = await Investor.findOne({ userId: userObjectId });
      if (!investor) {
        return res.status(404).json({ message: "Investor not found" });
      }
      investor.status = "success";
      await investor.save();
      console.log(user);
      return res
        .status(200)
        .json({ message: "Step 3 data saved successfully", investor });
    }
    return res.status(400).json({ message: "Invalid step" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.getAllInvestorData = async (req, res) => {
  try {
    // Extract page and limit from query params, set default values
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit 10
    const skip = (page - 1) * limit;

    // Fetch investors with pagination
    const investors = await Investor.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optional: Sort by latest created

    // Total count for pagination metadata
    const totalCount = await Investor.countDocuments();

    res.status(200).json({
      investors,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getInvestorById = async (req, res) => {
  try {
    const { id } = req.params;
    const investorID = mongoose.Types.ObjectId(req.params.id);
    let investor = await Investor.findById(investorID);
    if (!investor) {
      investor = await Investor.findOne({ userId: id });
      if (!investor) {
        return res.status(404).json({ message: "Investor not found" });
      }
    }
    res.status(200).json({ investor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
