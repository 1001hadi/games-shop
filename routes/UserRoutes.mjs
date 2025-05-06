import express from "express";
import User from "../models/userSchema.mjs";
import Cart from "../models/cartSchema.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, lastName, username, age, email, pwd } = req.body;

  if (!name || !lastName || !username || !age || !email || !pwd) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // Create a new user
    const user = new User({ name, lastName, username, age, email, pwd });

    // Save user to create unique mongodb _id
    const savedUser = await user.save();

    // Create users cart, pass in userID for user Property
    const cart = new Cart({ user: savedUser._id, items: [] });

    // Save cart to DB, to create unique mongodb _id for cart
    const savedCart = await cart.save();

    // Update user with cart ID reference, and save
    savedUser.cart = savedCart._id;
    await savedUser.save();

    res.status(201).json({
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        lastName: savedUser.lastName,
        username: savedUser.username,
        age: savedUser.age,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        cart: savedUser.cart,
        registrationDate: savedUser.registrationDate,
      },
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el) => el.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ msg: "Something went wrong during registration." });
  }
});

export default router;
