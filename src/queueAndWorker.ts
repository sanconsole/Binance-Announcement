import { Queue, Worker } from "bullmq";
import { fetchParseAndSaveReutersFeed } from "./workers/fetcher/reuters/reuters";
import { logger } from "./Helper/common/logger";
const connectionOptions = {
  connection: {
    host: "localhost", // Replace with your Redis server host
    port: 6379, // Replace with your Redis server port
  },
};
export const GLOBAL_QUEUE = new Queue("GLOBAL_QUEUE", connectionOptions);

const worker = new Worker("GLOBAL_QUEUE", async (job) => {
  const name = job.name;
  switch (name) {
    //Partner Feeds Start

    case "reuters":
      return await fetchParseAndSaveReutersFeed();
    //Partner Feeds Ends

    //Investing Fetcher Start
    //Investing Fetcher Ends

    default:
      break;
  }
  // await job.data();
});

worker.on("progress", (props) => {
  logger.info(`Queue: ${props.name} In Progress `);
});
worker.on("active", (props) => {
  const name = props?.name;
  logger.info(`ACTIVE: ${name[0].toUpperCase() + name.substring(1)}`);
});

worker.on("completed", (props) => {
  const name = props?.name;
  logger.info(`POP: ${name[0].toUpperCase() + name.substring(1)}`);
});

worker.on("failed", (props) => {
  logger.error(
    `Queue: ${props?.name} has failed with reason ${props?.failedReason}`
  );
});
