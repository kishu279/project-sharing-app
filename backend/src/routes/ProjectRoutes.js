const express = require("express");
const auth = require("../middleware/Auth");
const router = express.Router();

const db = require("./../db/database.js");

router.post("/create", auth, async (req, res) => {
  const uid = req.uid;
  const { title, description } = req.body;

  try {
    const pid = await db.InsertProjectData({ uid, title, description });
    return res.status(200).json({
      success: true,
      message: "Project Created",
      pid: pid,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
});

router.get("/view", auth, async (req, res) => {
  const uid = req.uid;

  try {
    const response = await db.ViewProjectData({ uid });

    if (!response) {
      return res.status(200).json({
        success: true,
        message: "Insert Data",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data fetched",
      data: response,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
