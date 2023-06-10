import { serialize } from "cookie";
import jwt from "jsonwebtoken";


// Simulated user data in the database

const username= "admin"
const password= "admin"

const users = [
  {
    username: username,
    password: password,
  },
];

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user with the provided username exists in the database 
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with password stored in the database 
    
    if (user.password!==password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // If both username and password are valid, generate a JWT token for the user
  
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,username: user.username }, process.env.JWT_SECRET);
    const serialised = serialize("theToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "Success!" });
  }catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Not authorized"});
  }
};

export default login;
