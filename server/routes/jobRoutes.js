const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// Add Job
router.post("/add", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      salary,
      recruiterId
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      description,
      salary,
      recruiterId
    });

    res.status(201).json({
      message: "Job added successfully",
      job
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add job"
    });
  }
});

// Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get jobs"
    });
  }
});

// Update Job
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Job updated successfully",
      job
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update job"
    });
  }
});

// Delete Job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job"
    });
  }
});

module.exports = router;