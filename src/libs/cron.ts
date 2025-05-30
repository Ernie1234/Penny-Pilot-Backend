// @libs/cron.ts
import cron from "node-cron";
import https from "https";
import env from "../configs/envConfig";

const keepAliveJob = cron.schedule("*/14 * * * *", () => {
  console.log("Running keep-alive ping...");
  https
    .get(env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("✅ Keep-alive ping successful");
      } else {
        console.log("⚠️ Keep-alive ping failed", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("❌ Keep-alive ping error:", e.message);
    });
});

// Export both the job and a function to start/stop it
export const startKeepAlive = () => {
  keepAliveJob.start();
  console.log("🔄 Keep-alive job started");
};

export const stopKeepAlive = () => {
  keepAliveJob.stop();
  console.log("🛑 Keep-alive job stopped");
};

export default keepAliveJob;
