import app from "./app";
import env from "./configs/envConfig";
import { connectDB, disconnectDB } from "./configs/db";

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();
    console.log("✅ Database connected successfully");

    // 2. Start Express Server
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port:  http://localhost:${env.PORT}`);
      console.log(`🌐 Environment: ${env.NODE_ENV}`);
    });

    // 3. Handle graceful shutdown
    const shutdown = async () => {
      console.log("🛑 Shutting down server...");

      server.close(async () => {
        await disconnectDB();
        console.log("🔌 Database connection closed");
        process.exit(0);
      });

      // Force close if hanging
      setTimeout(() => {
        console.error("⚠️ Forcing shutdown...");
        process.exit(1);
      }, 5000);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    await disconnectDB();
    process.exit(1);
  }
};

startServer();
