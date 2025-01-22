const mongoose = require("mongoose");
import { data } from "cheerio/lib/api/attributes";
import { SchemaNames } from "../interface/Feeds";
import { ModelList, Models } from "../interface/routes";
import { cronJobMap } from "../server";
const cron = require("node-cron");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const { ENVIRONMENT_IS_PRODUCTION, ENCRYPTION_SECRET_KEY } = process.env as any;

export const encryptObject = async (inputData: any) => {
  if (!inputData) return;
  let data = inputData;

  for (const key in data) {
    if (
      data.hasOwnProperty(key) &&
      key !== "title" &&
      key !== "automation_feeds" &&
      key !== "_id" &&
      key !== "__v" &&
      key !== "is_active" &&
      key !== "createdAt" &&
      key !== "updatedAt"
    ) {
      const originalValue = data[key];
      const encryptedValue = CryptoJS.AES.encrypt(
        originalValue,
        ENCRYPTION_SECRET_KEY
      ).toString();
      data[key] = encryptedValue;
    }
  }
  console.log(data)
  return data;
};
export const encryptPassword = async (inputData: any) => {
  if (!inputData) return;
  const originalPasssword = inputData.password
  const encryptedValue = CryptoJS.AES.encrypt(
    originalPasssword,
    ENCRYPTION_SECRET_KEY
  ).toString();
  return { ...inputData, password: encryptedValue };
};
export const decryptPassword = async (inputData: any) => {
  if (!inputData) return;
  const originalPasssword = inputData
  const decryptedValue = CryptoJS.AES.decrypt(
    originalPasssword,
    ENCRYPTION_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
  console.log("eee",decryptedValue)
  return decryptedValue;
  
};
export const decryptObject = async (data: any) => {
  if (!data) return;
  let encryptedData = data;
  for (const key in encryptedData) {
    if (
      encryptedData.hasOwnProperty(key) &&
      key !== "title" &&
      key !== "automation_feeds" &&
      key !== "_id" &&
      key !== "__v" &&
      key !== "is_active" &&
      key !== "createdAt" &&
      key !== "updatedAt"
    ) {
      const encryptedValue = encryptedData[key];
      const decryptedValue = CryptoJS.AES.decrypt(
        encryptedValue,
        ENCRYPTION_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      encryptedData[key] = decryptedValue;
    }
  }
  return encryptedData;
};

export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const CreateOrUpdateFirstDocumnet = async (Schema: any, data: any) => {
  const SchemaDocCount: number = await Schema.countDocuments();
  if (SchemaDocCount != 0) {
    const updated = await Schema.updateMany({}, { $set: { ...data } });
    return updated;
  } else {
    const created = await Schema.create(data);
    return created;
  }
};

export const GetFirstDocument = async (Schema: any) => {
  const SchemaDocCount: number = await Schema.countDocuments();
  if (SchemaDocCount != 0) {
    const docs = await Schema.find();
    return docs[0];
  } else {
    return {};
  }
};

export const fetcherEmitDataFunction = async (
  Schema: any,
  data: any[],
  emitFunction: any
) => {
  let totalDocCount = await Schema.countDocuments();

  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    const existingDoc = await Schema.find({
      title: item?.title,
      pubDate: item?.pubDate,
    });

    if (existingDoc?.length == 0) {
      const lastDoc = await Schema.findOne();
      if (lastDoc && totalDocCount > 200) {
        await Schema.deleteOne({ _id: lastDoc?._id });
      }
      await Schema.create(item);
    }
  }

  const schemaFeed = await Schema.find().sort([
    ["pubDate", -1],
    ["title", 1],
  ]);

  // console.log(data_to_emit.length, "created");
  emitFunction({ data: schemaFeed });
};

export const sortByDate = async (docs: any[]) => {
  docs.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
  return docs;
};
export const sortByParsedDate = async (docs: { pubDate: string }[]) => {
  docs.sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));
  return docs;
};

export const toTimestamp = async (strDate: string) => {
  var datum = Date.parse(strDate);
  return datum / 1000;
};

export const parseDate = async (strDate: string) => {
  const date = new Date(strDate);
  return date;
};

export const createCronJob = (
  schedule: string,
  cronId: string,
  listId: string
) => {
  const job = cron.schedule(schedule, () => {
    console.log(`Running cron job with ID ${cronId}...`);
  });

  // Store the cron job instance in the map
  cronJobMap.set(cronId, job);

  // Return the cron job instance
  return job;
};

export const disableCronJob = async (id: string) => {
  const job = cronJobMap.get(id);
  if (job) {
    job.stop();
    cronJobMap.delete(id);
    console.log(`Cron job ${id} disabled`);
  }
};

export const generateOrGetModel = (modelName: string) => {
  if (ModelList.includes(modelName)) {
    try {
      return mongoose.model(modelName);
    } catch (error) {
      const schema = new mongoose.Schema(
        {},
        { strict: false, timestamps: true }
      );
      return mongoose.model(modelName, schema);
    }
  } else {
    return null;
  }
};





export const getDelayedData = async (
  feedName: SchemaNames,
  query: any,
  model: any,
  response: any,
  delay: any
) => {
  const { page = 1, limit = 50 } = query;
  // const now = new Date();
  // const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000); // 10 minutes ago
  const data = await model
    .find({
      pubDate: {
        $lt: delay,
      },
    })
    .sort([
      ["pubDate", -1],
      ["title", 1],
    ])
    .skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()))
    .limit(parseInt(limit.toString()));

  const resData = {
    data,
    page: parseInt(page.toString()),
    limit: parseInt(limit.toString()),
    total: await model.countDocuments(),
  };

  return response.status(200).send(resData);
};

export const deleteOldestTwitterRecords = async (Schema: any) => {
  const result = await Schema.deleteMany({
    createdAt: { $lt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
  }); //deleteing records older than 14 days
  if (result.deletedCount)
    console.log(`${result.deletedCount} records deleted.`);
  // }
};

export const deleteOldestFeedRecords = async (Schema: any) => {
  // const count = await Schema.countDocuments();
  // let deleteCount = 0;
  // if (count > 1000) deleteCount = count - 1000;
  // const query = {};
  // const options = {
  //   sort: { pubDate: 1 }, // Sort by the 'createdAt' field in ascending order (oldest first)
  //   limit: deleteCount, // Delete only the oldest 1000 records
  // };
  // const result = await Schema.deleteMany(query, options);
  // console.log(`${result.deletedCount} records deleted.`);
  const result = await Schema.deleteMany({
    pubDate: { $lt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
  }); //deleteing records older than 14 days
  if (result?.deletedCount)
    console.log(`${result.deletedCount} records deleted.`);
  // }
};

const randomText = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; i += 1) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

export const slugifyWithoutRandomText = (string: string) =>
  string
    .toString() // converts input to a string
    .trim() // trims trailing whitespace
    .toLowerCase() // converts to lowercase
    .replace(/\s+/g, "-") // replaces any spaces with '-'
    .replace(/[^\w\-]+/g, "") // removes any non-word, non-hyphen characters
    .replace(/\-\-+/g, "-") // converts multiple hyphens to a single one
    .replace(/^-+/, "") // removes leading hyphens
    .replace(/-+$/, "") // removes trailing hyphens
    .replace("‘", "") // removes ' from string
    .replace("’", "") // removes ' from string
    .replace('"', "") // removes ' from string
    .replace("'", ""); // removes ' from string

export const slugifyWithRandomText = (string: string) => {
  return slugifyWithoutRandomText(string);
};

export const slugify = (string: string, version: string, length = 4) =>
  // slugifyWithoutRandomText(string).concat(`-${version}`); // adds random text to the end of the slug
  slugifyWithoutRandomText(string); // adds random text to the end of the slug

export const getUpsertedDocuments = async (dataArray: any, schema: any) => {
  const data: any = [];
  for (const item of dataArray) {
    const document = await schema.findOne({ _id: item?._id });
    data.push(document);
  }
  return data;
};



export const getTimeDifferenceInHours = (time: any) => {
  const timestamp: any = new Date(time);

  // Current time
  const currentTime: any = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - timestamp;

  // Convert the time difference to hours
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  return hoursDifference;
};
