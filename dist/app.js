"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const envConfig_1 = __importDefault(require("./configs/envConfig"));
const index_1 = __importDefault(require("./routes/index"));
const morgan_middleware_1 = __importDefault(require("./middlewares/morgan-middleware"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: [envConfig_1.default.MOBILE_APP_BASE_URL],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan_middleware_1.default);
// Routes
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});
app.use("/api/v1", index_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal Server Error",
        requestId: req.headers["x-request-id"],
    });
});
exports.default = app;
