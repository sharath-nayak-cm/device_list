import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectDb from "./db";
import User from "./models/User";
import Device from "./models/Device";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import "./passport-config"; // Import the Passport configuration

const app: Application = express();
const PORT = 3000;

const passportRouter = require("./passport");

// middleware

app.use(cors());
dotenv.config();

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", passportRouter);

// Session Configuration
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express and MongoDB!");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: false,
  })
);

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post("/user", async (req: Request, res: Response) => {
  console.log("this is  inside Post /users");
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/users", async (req: Request, res: Response) => {
  console.log("this is inside /users");
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Device Routes
app.post("/devices", async (req: Request, res: Response) => {
  try {
    const device = new Device(req.body);
    await device.save();
    res.status(201).send(device);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/devices", async (req: Request, res: Response) => {
  try {
    const devices = await Device.find().populate("assignedTo", "email");
    res.send(devices);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/dashboard", (req, res) => {
  console.log("this is  inside Get  /dashboard");
  if (req.isAuthenticated()) {
    res.send("Welcome to your dashboard");
  } else {
    res.redirect("/login");
  }
});

app.get("/debug", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated?.(), user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
