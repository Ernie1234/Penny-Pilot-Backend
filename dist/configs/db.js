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
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = __importDefault(require("./envConfig"));
let isConnected = false;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }
    try {
        const conn = yield mongoose_1.default.connect(envConfig_1.default.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });
        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
});
exports.connectDB = connectDB;
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (isConnected) {
        yield mongoose_1.default.disconnect();
        isConnected = false;
        console.log("MongoDB disconnected");
    }
});
exports.disconnectDB = disconnectDB;
// Optional: Auto-reconnect on connection loss
mongoose_1.default.connection.on("disconnected", () => {
    isConnected = false;
    console.log("MongoDB disconnected - attempting to reconnect...");
    setTimeout(exports.connectDB, 3000);
});
