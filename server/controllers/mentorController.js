const Mentor = require("../models/Mentor");
const mongoose = require("mongoose");
const User = require("../models/User");
exports.putMentorData = async (req, res) => {
  const { step, data } = req.body;
  console.log(data);
  console.log(step);
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
        network,
        name,
        interest,
        startupState,
        interestedCategorySector,
        brief,
      } = data.details;

      let mentor = await Mentor.findOne({ userId: userObjectId });
      if (!mentor) {
        mentor = new Mentor({ userId: userObjectId });
      }

      mentor.network = network;
      mentor.name = name;
      mentor.interest = interest;
      mentor.startupState = startupState;
      mentor.interestedCategorySector = interestedCategorySector;
      mentor.brief = brief;
      mentor.step = step;

      await mentor.save();
      return res
        .status(200)
        .json({ message: "Step 1 data saved successfully", mentor });
    }

    if (step === 2) {
      const { addressLine, state, district, pincode, linkedin, website } =
        data.address;

      let mentor = await Mentor.findOne({ userId: userObjectId });
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      // Update mentor with step 2 data
      mentor.addressLine = addressLine;
      mentor.state = state;
      mentor.district = district;
      mentor.pincode = pincode;
      mentor.linkedin = linkedin;
      mentor.website = website;
      mentor.step = step;

      await mentor.save();
      return res
        .status(200)
        .json({ message: "Step 2 data saved successfully", mentor });
    }
    if (step === 3) {
      let user = await User.findOne({ _id: userObjectId });
      user.role = "mentor";
      await user.save();

      let mentor = await Mentor.findOne({ userId: userObjectId });
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      // Update mentor with step 2 data
      mentor.status = "success";
      await mentor.save();
      return res
        .status(200)
        .json({ message: "Step 2 data saved successfully", mentor });
    }
    return res.status(400).json({ message: "Invalid step" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller function with pagination
exports.getAllMentorData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 results per page
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Mentor.countDocuments();

    // Fetch paginated mentors
    const mentors = await Mentor.find().skip(skip).limit(limit);

    // Send paginated response
    res.status(200).json({
      data: mentors,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getMentorById = async (req, res) => {
  try {
    const { id } = req.params;
    const mentorId = mongoose.Types.ObjectId(req.params.id);
    let mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      mentor = await Mentor.findOne({ userId: id });
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
    }
    res.status(200).json({ mentor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getWebinars = async (req, res) => {
  try {
    let { data } = req.body;
    console.log("Dharun");
    console.log(data);
    let mentor = await Mentor.find({ webinar: true });
    //console.log(mentor);
    return res.status(200).json({ message: "updated successfully", mentor });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};


exports.setWebinars = async (req, res) => {
  const { data } = req.body; // Remove if not used
  // console.log(data)
  const userId = req.user?.id; // Optional chaining for safety

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    let mentor = await Mentor.findOne({ userId: userId });

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    if(true)
    {
    mentor.webinar = true; // Assuming you want to set this field to true
    await mentor.save();
    }
    // else{
    //   mentor.webinarAsked=[...mentor.webinarAsked,{id:data._id,name:data.name,email:data.email,mobile:data.mobile}];
    //   await mentor.save();
    // }

    console.log("Mentor updated:", mentor);

    return res.status(200).json({ message: "Updated successfully", mentor });
  } catch (error) {
    console.error("Error updating mentor:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
exports.setWebinarsById = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const userId = req.user?.id; // Optional chaining for safety
  console.log(req.user);
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    // Fetch the mentor by ID
    let mentor = await Mentor.findOne({ _id: id });
    console.log(mentor);

    // Fetch the user data by ID
    let data = await User.findOne({ _id: req.user.id });
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Check if the user ID is already in mentor.webinarAsked array
    const webinarExists = mentor.webinarAsked.some(
      (webinar) => webinar.id.toString() === data._id.toString()
    );

    // If the user ID is not present, add the data
    if (!webinarExists) {
      mentor.webinarAsked = [
        ...mentor.webinarAsked,
        {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
      ];

      // Save the updated mentor data
      await mentor.save();

      console.log("Mentor updated:", mentor);
      return res.status(200).json({ message: "Updated successfully", mentor });
    } else {
      return res.status(200).json({ message: "User already in webinarAsked list" });
    }
  } catch (error) {
    console.error("Error updating mentor:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
