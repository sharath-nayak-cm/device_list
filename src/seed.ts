import mongoose from "mongoose";
import connectDb from "./db";
import Device from "./models/Device";
import User from "./models/User";

const seedDevices = async () => {
  try {
    const user = await User.findOne(); // Assumes there is at least one user in the User collection

    if (!user) {
      console.log("No user found. Seed users first.");
      return;
    }

    const devices = [
      {
        name: "Device 1",
        deviceId: 101,
        deviceType: "Sensor",
        assignedTo: user._id,
      },
      {
        name: "Device 2",
        deviceId: 102,
        deviceType: "Sensor",
        assignedTo: user._id,
      },
      {
        name: "Device 3",
        deviceId: 103,
        deviceType: "Camera",
        assignedTo: user._id,
      },
    ];

    await Device.insertMany(devices);
    console.log("Devices seeded successfully");
  } catch (err) {
    console.error("Error seeding devices:", err);
  } finally {
    mongoose.connection.close();
  }
};

connectDb();

const runSeed = async () => {
  await seedDevices();
};

runSeed();
