

import { CronJob } from "cron";
import { fetchBinanceAnnouncements } from "./workers";
const { ENVIRONMENT_IS_PRODUCTION } = process.env as any;
export const cronInit = () => {
  //COMMENT:Test
  if (ENVIRONMENT_IS_PRODUCTION == "false") {
    BinanceAnnouncementsCronJob.start();
  }

  if (ENVIRONMENT_IS_PRODUCTION == "true") {
    BinanceAnnouncementsCronJob.start();

    // ReutersTokenCronJob.start();
    // PiQAuthTokenFetcherCronJob.start();
  }
};



// Run every 30 minutes
export const BinanceAnnouncementsCronJob = new CronJob(
  "*/10 * * * * *",
  async () => {
    try {
      console.log("Running Binance announcements cron job");
      await fetchBinanceAnnouncements();
    } catch (error) {
      console.error("Error in Binance announcements cron job:", error);
    }
  },
  null,
  false,
  "UTC"
);
