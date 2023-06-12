import { serialize } from "cookie";
import { SignJWT, JWT } from "jose";
import { getJwtSecretkey } from "../../utils/auth";

// A default username and password that we can get from backend (password should be hashed in real project)

const username = "admin";
const password = "admin";

const users = [
  {
    username: username,
    password: password,
  },
];
// Login API

const login = async (req, res) => {
  try {
    const { username, password,rememberMe } = req.body;
    console.log('remeber me',rememberMe);
    const secret = new TextEncoder().encode(getJwtSecretkey());

  // Check if user with the provided username exists in the database

    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

  // Compare the provided password with the password stored in the database 

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

  // If both username and password are valid, generate a JWT token for the user
 
    const token = await new SignJWT({ username: user.username })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(rememberMe?"30d":'10s') 
      .sign(secret);

  // Set token in the browser cookies
  
    res.setHeader("Set-Cookie", serialize("theToken", token, {
      path: "/",
    }));
    res.status(200).json({ message: "Success!" });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Not authorized" });
  }
};

export default login;

