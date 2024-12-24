"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const User_1 = __importDefault(require("./models/User"));
const Device_1 = __importDefault(require("./models/Device"));
const app = (0, express_1.default)();
const PORT = 3000;
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express and MongoDB!");
});
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default(req.body);
        yield user.save();
        res.status(200).send(user);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("this is inside /users");
    try {
        const users = yield User_1.default.find();
        res.status(200).send(users);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
// Device Routes
app.post("/devices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const device = new Device_1.default(req.body);
        yield device.save();
        res.status(201).send(device);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
app.get("/devices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const devices = yield Device_1.default.find();
        res.send(devices);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
