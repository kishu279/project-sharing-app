const express = require("express");
const router = express.Router();
const db = require("./../db/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "required fields are necessary",
    });
  }

  try {
    const uid = await db.InsertUserData({ name, email, password }); // returning uid as response
    console.log(uid);

    return res.status(200).json({
      success: true,
      message: "user account created",
      uid: uid,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "required fields are necessary",
    });
  }

  try {
    const user = await db.FindUserData({ email });
    if (user && user.uid !== null) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = await jwt.sign({ uid: user.uid }, SECRET_KEY, {
          expiresIn: "2h",
        });
        console.log("SIGNED IN");
        return res
          .status(200)
          .json({ success: true, message: "SIGNED IN", token: token });
      }
    }

    return res.status(400).json({
      successs: false,
      message: "SIGNIN FAILED",
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
