const express = require("express");
const Application = require("../models/Application");
const Job = require("../models/Job");

const router = express.Router();

// Apply Job
router.post("/apply", async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    const existingApplication = await Application.findOne({
      jobId,
      userId
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already applied for this job"
      });
    }

    const application = await Application.create({
      jobId,
      userId
    });

    res.status(201).json({
      message: "Job applied successfully",
      application
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to apply for job"
    });
  }
});

// My Applications
router.get("/user/:userId", async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.params.userId
    })
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get applications"
    });
  }
});

// Recruiter Applications
router.get("/recruiter/:recruiterId", async (req, res) => {
  try {

    // Recruiter posted jobs
    const jobs = await Job.find({
      recruiterId: req.params.recruiterId
    });

    const jobIds = jobs.map((job) => job._id);

    // Applications for those jobs
    const applications = await Application.find({
      jobId: { $in: jobIds }
    })
      .populate("jobId")
      .populate("userId")
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get recruiter applications"
    });
  }
});

module.exports = router;