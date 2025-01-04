const mongoose = require("mongoose");
const Startup = require("../models/Startup");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "spack1022005@gmail.com",
    pass: "sdapnqmawpzfbpru",
  },
  port: 587, // or use 587 for STARTTLS
  secure: false,
});
//Fetch startups by status
exports.getStartupsByStatus = async (req, res, st) => {
  let status = st === "approved" ? st : getStatusBasedOnRole(req.user.role);

  if (!status) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const startups = await Startup.find({ status });
    res.json(startups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Fetch startup by ID
exports.getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ msg: "Startup not found" });
    }
    res.json(startup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.updateStartupStatus = async (req, res, status) => {
  status = status === "verify" ? getStatusBasedOnVerify(req.user.role) : status;
  if (!status) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ msg: "Startup not found" });
    }
    // Update the startup status to user
    startup.status = status;
    await startup.save();
    if (status === "approved") {
      const id = startup.userId;
      const user = await User.findById(id);
      console.log(user + "=>" + user.role);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      user.role = "startup";
      await user.save();
    }
    const responseMessage = {
      msg:
        status === "rejected"
          ? req.body.message || "Document mismatch"
          : `Startup ${status}`,
      status,
    };

    // Send the initial response
    res.json(responseMessage);

    // Only proceed to send an email if the status is 'rejected'
    if (status === "rejected") {
      const message =
        req.body.message ||
        "Officials Reject the Application, Please check the necessary documents";

      console.log(message);
      const startup = await Startup.findById(req.params.id);
      startup.message = message;
      await startup.save();
      if (!startup) {
        return res.status(404).json({ msg: "Startup not found" });
      }
      const { userId } = startup;
      const user = await User.findById(userId);
      if (!user) {
        console.log("User not found");
        return; // E
      }
      const { email } = user;
      // console.log(startup)
      // console.log(user);
      const mailOptions = {
        from: "spack1022005@gmail.com",
        to: email,
        subject: "Your startup registration application will be Rejected.",
        text: message,
        html: `<h1> ${message} </h1>`,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        // Do not send another response here
      } catch (error) {
        console.error("Error occurred while sending email:", error);
        // Handle the email error appropriately, but do not send another response
      }
    }
  } catch (err) {
    console.error(err.message);
    if (!res.headersSent) {
      res.status(500).send("Server error");
    }
  }
};

// Helper function to get status based on role
function getStatusBasedOnRole(role) {
  switch (role) {
    case "clerk":
      return "pending";
    case "authority":
      return "proceed";
    default:
      return null;
  }
}
function getStatusBasedOnVerify(role) {
  switch (role) {
    case "clerk":
      return "proceed";
    case "authority":
      return "approved";
    default:
      return null;
  }
}
