import mongoose from "mongoose";

// building schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your first name"],
    trim: true,
    minLength: [3, "First name can't be less than 3 characters long"],
    maxLength: [20, "First name can't be more than 20 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    trim: true,
    minLength: [3, "Last name can't be less than 3 characters long"],
    maxLength: [20, "Last name can't be more than 20 characters long"],
  },
  username: {
    type: String,
    required: [true, "Please provide your last username"],
    trim: true,
    minLength: [3, "Username can't be less than 3 characters long"],
    maxLength: [20, "Username can't be more than 20 characters long"],
  },
  age: {
    type: Number,
    min: [13, "Must be over 13 to purchases!"],
    max: [55, "Come on, Go work, you better save for your retirement!"],
    validate: {
      validator: Number.isInteger,
      message: "please enter your age!",
    },
    index: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    trim: true,
    unique: true,
    // match: [
    //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //   "Email address must be valid !",
    // ],
    // to create index with mongoose
    index: true,
  },
  pwd: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 123,
    //     pattern:
    //       "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,128}$",
    //     examples: ["P@$$wOrd123", "SecurePassword!", "MyPa$$wOrd"],
    //   },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
});

export default mongoose.model("User", userSchema);
