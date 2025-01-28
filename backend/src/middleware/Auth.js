require("dotenv").config();
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ success: false, message: "Sign in again" });
  }

  try {
    await jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
      if (decoded) {
        req.uid = decoded.uid;
        return next();
      }
      if (err) {
        return res.status(400).json({
          success: false,
          message: "sign in failed",
        });
      }
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
    });
  }
};

module.exports = auth;
