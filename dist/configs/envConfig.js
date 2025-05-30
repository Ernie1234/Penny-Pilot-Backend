"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
require("dotenv/config");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]),
    PORT: zod_1.z.string().default("3000"),
    CLERK_SECRET_KEY: zod_1.z.string(),
    CLERK_PUBLISHABLE_KEY: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    MONGODB_URL: zod_1.z.string(),
    API_URL: zod_1.z.string(),
    MOBILE_APP_BASE_URL: zod_1.z.string(),
});
const env = envSchema.safeParse(process.env);
if (!env.success) {
    console.error("❌ Invalid environment variables:", env.error.format());
    process.exit(1);
}
exports.default = env.data;
