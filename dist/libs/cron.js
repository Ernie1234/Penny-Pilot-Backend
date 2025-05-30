"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = __importDefault(require("cron"));
const https_1 = __importDefault(require("https"));
const envConfig_1 = __importDefault(require("../configs/envConfig"));
const job = new cron_1.default.CronJob("*/14 * * * *", function () {
    https_1.default
        .get(envConfig_1.default.API_URL, (res) => {
        if (res.statusCode === 200)
            console.log("GET request sent successfully");
        else
            console.log("GET request failed", res.statusCode);
    })
        .on("error", (e) => console.error("Error while sending request", e));
});
exports.default = job;
// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals
// we want to send 1 GET request for every 14 minutes
// How to define a "Schedule"?
// You define a schedule using a cron expression, which consists of 5 fields representing:
//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK
//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour
