const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const jwt_secret = "iNotebook";
//router 1: Create the user : POST request
router.post(
  "/signup",
  [
    body("name", "Enter a name with min length 3").isLength({ min: 3 }),
    body("email", "Enter the correct email").isEmail(),
    body("password", "Enter min length 3 password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: success, errors: errors.array() });
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success: success,
            error: "User with same email id already exists",
          });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success: success, authtoken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//router 2: Authenticate the user :POST
router.post(
  "/login",
  [
    body("email", "Enter the correct email").isEmail(),
    body("password", "Enter min length 3 password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ success: success, errors: errors.array() });
      }

      let { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({
            success: success,
            error: "Try to login using valid credentials",
          });
      }

      const PasswordComp = await bcrypt.compare(password, user.password);
      if (!PasswordComp) {
        return res
          .status(401)
          .json({
            success: success,
            error: "Try to login using valid credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success: success, authtoken: authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//router 3: Get the user details using jwt :POST
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;

    let user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
