import { SchemaNames } from "../interface/Feeds";
const CryptoJS = require("crypto-js");
import {
  decryptObject,
  encryptObject,
  encryptPassword,
  getDataFromRedisClient,
  removeDataFromRedisClient,
  saveDataToRedisClient,
} from "../workers/common";
export const getList = async (
  feedName: SchemaNames,
  query: any,
  model: any,
  response: any
) => {
  const { page = 1, limit = 50 } = query;
  const data = await model
    .find()
    .sort([
      ["pubDate", -1],
      ["title", 1],
    ])
    .skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()))
    .limit(parseInt(limit.toString()));

  let dataFromRedish = await getDataFromRedisClient(
    `${feedName}_${page}_${limit}`
  );
  if (!dataFromRedish) {
    dataFromRedish = {
      data,
      page: parseInt(page.toString()),
      limit: parseInt(limit.toString()),
      total: await model.countDocuments(),
    };
    await saveDataToRedisClient(`${feedName}_${page}_${limit}`, dataFromRedish);
  }
  if (dataFromRedish?.data?.length) {
    return response.status(200).send(dataFromRedish);
  } else {
    return response.status(404).send("NO_DATA_FOUND");
  }
};

export const addDataToList = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response: any
) => {
  // // Add new ramble to the database
  const data = await model.create(request?.body);

  if (data) {
    await removeDataFromRedisClient(feedName);
    return response.status(200).json({
      status: true,
      data,
      message: "Added Successfully",
    });
  } else {
    return response.status(400).json({
      status: false,
      msg: "Something went wrong",
    });
  }
};

export const addEncryptedDataToList = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response: any
) => {
  let data = await encryptObject(request?.body);
  data = await model.create(data);

  if (data) {
    await removeDataFromRedisClient(feedName);
    return response.status(200).json({
      status: true,
      data,
      message: "Added Successfully",
    });
  } else {
    return response.status(400).json({
      status: false,
      msg: "Something went wrong",
    });
  }
};

export const updateEncryptedDataToList = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response: any
) => {
  const _id = request.params._id;
  let body = await encryptObject(request?.body);
  const data = await model.updateOne({ _id }, { $set: body });
  if (!data) return response.status(401).send("Item not found");
  await removeDataFromRedisClient(feedName);
  console.log(body, _id);

  response.status(201).json({
    status: true,
    data,
    msg: "Updated Successful !",
  });
};

export const updateDataToList = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response: any
) => {
  const _id = request.params.id;
  const data = await model.updateOne({ _id }, { $set: request.body });
  if (!data) return response.status(401).send("Update Failed");
  await removeDataFromRedisClient(feedName);
  response.status(201).json({
    status: true,
    data,
    msg: "Updated Successful !",
  });
};

export const deleteDataFromList = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response: any
) => {
  const _id = request.params.id;
  const data = await model.updateOne({ _id }, { $set: request.body });
  if (!data) return response.status(401).send("Update Failed");
  await removeDataFromRedisClient(feedName);
  response.status(201).json({
    status: true,
    data,
    msg: "Updated Successful !",
  });
};

export const deleteData = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response: any
) => {
  const _id = request.params._id;
  const data = await model.findByIdAndDelete({ _id });
  if (!data) return response.status(401).send("Deleted Failed");
  await removeDataFromRedisClient(feedName);
  response.status(201).json({
    status: true,
    data,
    msg: "Deleted Successful !",
  });
};
