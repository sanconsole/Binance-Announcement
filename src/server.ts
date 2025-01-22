import App from "./app";
import { cronInit } from "./cronInit";
import { logger } from "./Helper/logger";
import { fetchBinanceAnnouncements } from "./workers";

/* eslint-disable no-var-requires */
require("dotenv").config();

const { PORT } = process.env;
const { ENVIRONMENT_IS_PRODUCTION, PIQ_MAIN_DB_URL, PIQ_MAIN_DB_NAME } =
  process.env as any;
export const cronJobMap = new Map();
export const app = new App(
  [
    // new TwitterRoute(),
    // new TelegramRoute(),
    // new DiscordRoute(),
    // new BlueSkyRoute(),
  ],
  PORT
);

app.listen();

// run this every 30 mins!!
cronInit();




process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  // Perform cleanup tasks if necessary
  // process.exit(1); // Exit the process
});

// Global error handling for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", reason);
  // Perform cleanup tasks if necessary
  // process.exit(1); // Exit the process
});

export const io = app.IO;


