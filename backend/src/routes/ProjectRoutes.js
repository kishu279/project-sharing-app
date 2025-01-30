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

router.post("/update", auth, async (req, res) => {
  const pid = req.query.pid;
  // console.log(typeof pid);

  const { title, description } = req.body;

  try {
    const state = await db.UpdateProjectData({ pid, title, description });
    if (state) {
      return res
        .status(200)
        .json({ success: true, message: "updated successfully" });
    }

    return res.status(400).json({
      success: false,
      message: "Retry",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
});

router.get("/:pid", auth, async (req, res) => {
  const pid = req.params.pid;
  console.log(pid);

  try {
    const data = await db.ViewProjectData({ pid });
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "success",
      data: data,
    });
  } catch (err) {
    console.error("err: ", err);
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
