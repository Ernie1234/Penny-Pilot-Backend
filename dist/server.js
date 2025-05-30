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
const app_1 = __importDefault(require("./app"));
const envConfig_1 = __importDefault(require("./configs/envConfig"));
const db_1 = require("./configs/db");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Connect to Database
        yield (0, db_1.connectDB)();
        console.log("✅ Database connected successfully");
        // 2. Start Express Server
        const server = app_1.default.listen(envConfig_1.default.PORT, () => {
            console.log(`🚀 Server running on port:  http://localhost:${envConfig_1.default.PORT}`);
            console.log(`🌐 Environment: ${envConfig_1.default.NODE_ENV}`);
        });
        // 3. Handle graceful shutdown
        const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("🛑 Shutting down server...");
            server.close(() => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, db_1.disconnectDB)();
                console.log("🔌 Database connection closed");
                process.exit(0);
            }));
            // Force close if hanging
            setTimeout(() => {
                console.error("⚠️ Forcing shutdown...");
                process.exit(1);
            }, 5000);
        });
        process.on("SIGTERM", shutdown);
        process.on("SIGINT", shutdown);
    }
    catch (err) {
        console.error("❌ Failed to start server:", err);
        yield (0, db_1.disconnectDB)();
        process.exit(1);
    }
});
startServer();
