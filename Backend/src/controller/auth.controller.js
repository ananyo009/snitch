import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign({ id: user._id }, config.jwt_secret, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  return res.status(200).json({
    message: message,
    success: true,
    user: {
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
      role: user.role,
    },
  });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      message: "user does not exist please register",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  await sendTokenResponse(user, res, "logged in successfully");
}

export async function registerUser(req, res) {
  const { email, fullname, contact, password, isSeller } = req.body;
  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists"
          : "Contact number already exists";
      return res.status(400).json({ message: message });
    }
    const newUser = await userModel.create({
      email,
      fullname,
      password,
      contact,
      role: isSeller ? "seller" : "buyer",
    });
    await sendTokenResponse(newUser, res, "user registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
}

export async function googleCallback(req, res) {
  const { emails, displayName, photos, id } = req.user;

  const email = emails[0].value;
  const profilePic = photos[0].valule;

  const existUser = await userModel.findOne({
    email,
  });
  if (!existUser) {
    existUser = await userModel.create({
      email,
      googleId: id,
      fullname: displayName,
    });
  }

  const token = jwt.sign({ id: existUser._id }, config.jwt_secret, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  res.redirect("http://localhost:5173");
}

export async function getMe(req, res) {
  const user = req.user;

  return res.status(200).json({
    message: "user fetched succesfully",
    user: {
      id: user._id,
      username: user.fullname,
      email: user.email,
    contact: user.contact,
      role: user.role
    },
  });
}