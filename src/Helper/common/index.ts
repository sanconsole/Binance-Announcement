import axios from "axios";
import Discord, { GatewayIntentBits, REST, Routes } from "discord.js";
import { logger } from "./logger";
import FormData from "form-data";
const { TwitterApi } = require("twitter-api-v2");
const { BskyAgent, RichText } = require("@atproto/api");

const client = new Discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
client.on("ready", (msg) => {
  logger.info(`Logged in to Discord ${client?.user?.tag}!`);
});

const POST_TWEET = true;
export const diff_minutes = async (dt2: any, dt1: any) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

export const getMonthByIndex = (id: any) => {
  switch (id) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "Invalid";
  }
};

export const postToTelegram = async (data: any) => {
  try {
    var headline = data?.title
    headline = headline + `\n\n${data?.articleUrl}`



    // if (base64 && base64 !== null) {
    //   var base64Data = base64.replace(/^data:image\/png;base64,/, "");
    //   const directoryPath = "telegram_image.png";
    //   if (require("fs").existsSync(directoryPath)) {
    //     require("fs").unlinkSync(directoryPath);
    //     logger.info("Telegram : Image Deleted");
    //   }
    //   require("fs").writeFile(
    //     directoryPath,
    //     base64Data,
    //     "base64",
    //     async (err: any) => {
    //       logger.info("Telegram : Image Saved");
    //       const url = `https://api.telegram.org/bot${item.bot_token}/sendPhoto`;
    //       // Read the image file into a buffer
    //       const imageBuffer = require("fs").readFileSync("telegram_image.png");
    //       // Create a FormData object to send as multipart/form-data
    //       const formData = new FormData();
    //       formData.append("chat_id", item.channel_id);
    //       formData.append("photo", imageBuffer, {
    //         filename: "telegram_image.png",
    //       });
    //       formData.append("caption", headline);

    //       // Make the API request
    //       const response = await axios.post(url, formData, {
    //         headers: formData.getHeaders(),
    //       });

    //       logger.info("Telegram: Headline Posted On Telegram");
    //     }
    //   );
    // } else {
      await axios.get(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${
          process.env.TELEGRAM_CHANNEL_ID
        }&text=${encodeURI(headline)}`
      );
      logger.info("Telegram: Headline Posted On Telegram");
    // }
  } catch (err: any) {
    logger.error(err, "error from telgram");
  }
};

export const postToDiscord = async (headline: any, item: any, base64: any) => {
  try {
    // var client = clients.find(
    //   (client: any) => client.channel_id === item.channel_id
    // );

    // if (!client) {
    //   client = new Discord.Client({
    //     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    //   });
    //   client.login(item.bot_token);
    //   clients.push({
    //     channel_id: item.channel_id,
    //     client: client,
    //   });
    // }

    // client.login(item.bot_token); //only for testing

    if (base64 && base64 !== null) {
      var base64Data = base64.replace(/^data:image\/png;base64,/, "");
      const directoryPath = "discord_image.png";
      if (require("fs").existsSync(directoryPath)) {
        require("fs").unlinkSync(directoryPath);
        logger.info("Discord : Image Deleted");
      }

      require("fs").writeFile(
        directoryPath,
        base64Data,
        "base64",
        async (err: any) => {
          const payload = {
            content: "\n\n" + headline,
            files: [directoryPath],
          };
          logger.info("Discord : Image Saved");
          const rest = new REST({ version: "10" }).setToken(item.bot_token);
          await rest.post(Routes.channelMessages(item.channel_id), {
            body: payload,
          });
          logger.info("Discord: Headline Posted On Discord");
        }
      );
    } else {
      const payload = {
        content: headline + "\n",
      };
      const rest = new REST({ version: "10" }).setToken(item.bot_token);
      await rest.post(Routes.channelMessages(item.channel_id), {
        body: payload,
      });
    }
  } catch (err: any) {
    logger.error(err, "error from Discord");
  }
};

const textTweet = async (client: any, text: any) => {
  try {
    // rwClient.v2
    // const rwClient = client.readWrite;

    await client.v2.tweet(text);
    logger.info("Twitter: Tweet Posted On Twitter Without Image");
  } catch (err: any) {
    logger.error(
      "Twitter Code :" + err?.data?.status + " Message: " + err?.data?.detail
    );
  }
  //   if (err?.data?.status === 429) {
  //   //   const twitterAccount = await TwitterSchema.findById(item?._id);
  //   //   if (twitterAccount) {
  //   //     twitterAccount.is_active = false;
  //   //     twitterAccount.save();
  //   //   }
  //   // }
  //   logger.error(err, "error from Twitter");
  //   logger.error(
  //     "Twitter Code :" + err?.data?.status + " Message: " + err?.data?.detail
  //   );
  // }
};

const mediaTweet = async (client: any, text: any, image: any) => {
  try {
    // await textTweet(client, text);

    // const rwClient = client.readWrite;
    var base64Data = image.replace(/^data:image\/png;base64,/, "");
    const directoryPath = "twitter_image.png";
    if (require("fs").existsSync(directoryPath)) {
      require("fs").unlinkSync(directoryPath);
      logger.info("Twitter : Image Deleted");
    }
    require("fs").writeFile(
      directoryPath,
      base64Data,
      "base64",
      async (err: any) => {
        logger.info("Twitter : Image Saved");
        const mediaId = await client.v1.uploadMedia(directoryPath);
        await client.v2.tweet({
          text: text,
          media: { media_ids: [mediaId] },
        });

        logger.info("Twitter: Tweet Posted On Twitter With Image");
      }
    );
  } catch (err: any) {
    logger.error(
      "Twitter Code :" + err?.data?.status + " Message: " + err?.data?.detail
    );

    // if (err?.data?.status === 429) {
    //   const twitterAccount = await TwitterSchema.findById(item?._id);
    //   if (twitterAccount) {
    //     twitterAccount.is_active = false;
    //     twitterAccount.save();
    //   }
    // }
  }
};

export const postTwit = async (text: any, item: any, base64: any) => {
  try {
    // console.log(item, "item");
    // if (
    //   !item?.api_key ||
    //   !item?.api_key_secret ||
    //   !item?.access_token ||
    //   item?.access_token_secret ||
    //   !text
    // ) {
    //   return;
    // }
    console.log(text, "text");

    const client = new TwitterApi({
      appKey: item.api_key,
      appSecret: item.api_key_secret,
      accessToken: item.access_token,
      accessSecret: item.access_token_secret,
      // bearerToken: item.bearer_token,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });
    // client.v2.tweet(item);
    if (base64 && base64 !== null) {
      await mediaTweet(client, text, base64);
    } else {
      await textTweet(client, text);
    }
  } catch (err: any) {
    logger.error(
      "Twitter Code :" + err?.data?.status + " Message: " + err?.data?.detail
    );
    // if (error.code === 429) {
    //   const twitterAccount = await TwitterSchema.findById(item?._id);
    //   if (twitterAccount) {
    //     twitterAccount.is_active = false;
    //     twitterAccount.save();
    //   }

    //   logger.error("Twitter Message => " + error?.message);
    //   logger.error("Twitter :" + error?.stack);
    // }
  }
};

export const postBSky = async (text: any, item: any, base64: any) => {
  try {
    if (!item?.user_name || !item?.password || !text) return;

    const agent = new BskyAgent({ service: "https://bsky.social" });
    await agent.login({
      identifier: item?.user_name,
      password: item?.password,
    });

    const richText = new RichText({ text });
    await richText.detectFacets(agent);

    // client.v2.tweet(item);
    if (base64 && base64 !== null) {
      var base64Data = base64.replace(/^data:image\/png;base64,/, "");
      const directoryPath = "bsky_image.png";
      if (require("fs").existsSync(directoryPath)) {
        require("fs").unlinkSync(directoryPath);
        logger.info("BSky : Image Deleted");
      }

      require("fs").writeFile(
        directoryPath,
        base64Data,
        "base64",
        async (err: any) => {
          logger.info("BSky : Image Saved");

          const file = require("fs").readFileSync(directoryPath);
          const image = Buffer.from(file);
          const { data } = await agent.uploadBlob(
            image,
            // convertDataURIToUint8Array(`data:image/png;base64,` + base64),
            {
              encoding: "image/png",
            }
          );
          await agent.post({
            text: richText.text,
            facets: richText.facets,
            embed: {
              images: [
                {
                  alt: "https://PiQSuite.com",
                  image: data.blob,
                },
              ],
              $type: "app.bsky.embed.images",
            },
          });
          logger.info("BSky: Bsky Posted On Twitter With Image");
        }
      );
    } else {
      await agent.post({
        text: richText.text,
        facets: richText.facets,
      });
      // await textTweet(client, text);
    }
  } catch (err: any) {
    logger.error("BSky:" + err?.message);
    // if (error.code === 429) {
    //   const twitterAccount = await TwitterSchema.findById(item?._id);
    //   if (twitterAccount) {
    //     twitterAccount.is_active = false;
    //     twitterAccount.save();
    //   }

    //   logger.error("Twitter Message => " + error?.message);
    //   logger.error("Twitter :" + error?.stack);
    // }
  }
};
