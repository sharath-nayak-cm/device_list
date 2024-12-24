"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const deviceSchema = new mongoose_1.Schema({
    name: { type: String, require: true, uniq: true },
    deviceId: {
        type: Number,
        required: true,
        uniq: true,
    },
    deviceType: { type: String, required: true },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const Device = (0, mongoose_1.model)("Device", deviceSchema);
exports.default = Device;
