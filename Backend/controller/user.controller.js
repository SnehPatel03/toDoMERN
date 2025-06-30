import User from "../model/user.model.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import generateTokenAndSaveInCookies from "../jwt/token.js";

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain 3 to 20 characters" })
    .max(20, { message: "Username must contain 3 to 20 characters" }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 character" }),
});

export const signIn = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "Enter All cardentials" });
    }
    const validate = userSchema.safeParse({ email, username, password });
    if (!validate.success) {
      const errorMessage = validate.error.errors.map((err) => err.message);
      return res.status(400).json({ error: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Registred" });
    }
    //hashing of password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });

    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      return res
        .status(201)
        .json({ message: "User Registrestion Successfully", newUser , token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in  SIGN IN functionality" });
  }
};
export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Enter All Cardentials" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid Email or Password" });
    }
    const token = generateTokenAndSaveInCookies(user._id, res);
    res.status(201).json({ message: "User loggedIn succesfully", user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in  Log in functionality" });
  }
};
export const LogOut = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(201).json({ message: "User logged Out successfully" });
  } catch (error) {
    console.log("error in logOut", error);
    res.status(400).json({ message: "Error in  Log Out functionality" });
  }
};
