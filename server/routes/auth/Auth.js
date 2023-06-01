import express from "express";
import bcrypt, { genSalt, getRounds } from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../conn/conn.js";
import "dotenv/config.js";
const Auth = express.Router();

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// User registration route
Auth.post("/users", async (req, res) => {
    const { username, email, phone, role, password } = req.body;
  
    if (!username || !email || !phone || !role || !password) {
      return res.status(400).json({ message: "Fill all the fields" });
    }
  
    try {
      const saltRounds = 15;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const createQuery = "INSERT INTO users (username, email, phone, role, password) VALUES (?, ?, ?, ?, ?)";
      db.query(createQuery, [username, email, phone, role, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.sendStatus(500);
        }
        return res.status(201).json({ message: "User inserted successfully", result });
      });
    } catch (err) {
      console.error("Error hashing password:", err);
      return res.sendStatus(500);
    }
  });
  
// User login route
Auth.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Fill all the fields" });
    return;
  }

  const query = "SELECT * FROM users WHERE email=?";

  try {
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Error fetching user data:", err);
        res.sendStatus(500);
        return;
      }

      // Check if user exists
      if (results.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const user = results[0];
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        // Send JWT and user role
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          "your_secret_key"
        );
        res.json({ token, role: user.role });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Error comparing passwords:", error);
    res.sendStatus(500);
  }
});

  
  Auth.get("/admin-route", (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.error("Error verifying JWT token:", err);
        res.sendStatus(401);
        return;
      }
  
      if (decoded.role !== "super_admin") {
        res.sendStatus(403);
        return;
      }
  
      res.json({ message: "Protected route for super admin" });
    });
  });
  

export default Auth;
