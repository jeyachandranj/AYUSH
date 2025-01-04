const Startup = require("../models/Startup");

exports.startupStatus = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        if (!id || id.trim() === "") {
            return res.status(400).json({ error: "Invalid startup ID provided." });
        }
        const startup = await Startup.findOne({ userId: id });
        if (!startup) {
            return res.status(404).json({ error: "Startup not found." });
        }
        console.log("Startup found:", startup.name);
        res.json({ company:startup,status:startup.status });
    } catch (error) {
        console.error("Error fetching startup status:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};
exports.setStatus= async (req,res,status)=>{
    try {
        const id = req.params.id;
        console.log(id)
        if (!id || id.trim() === "") {
            return res.status(400).json({ error: "Invalid startup ID provided." });
        }
        const startup = await Startup.findOne({ userId: id });
        if (!startup) {
            return res.status(404).json({ error: "Startup not found." });
        }
        startup.status=status;
        await startup.save();
        res.json({message:"status is set",startups:startup.status});;
    } catch (error) {
        console.error("Error fetching startup status:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}
