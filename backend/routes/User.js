const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  password: zod.string(),
});
router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const dbUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created successfully",
  });
});
module.exports = router;
