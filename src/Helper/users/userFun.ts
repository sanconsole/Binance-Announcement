import { SchemaNames } from "../../interface/Feeds";
const CryptoJS = require("crypto-js");
import {
  decryptPassword,
  encryptPassword,
  removeDataFromRedisClient,
} from "../../workers/common";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const addUser = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response?: any
) => {
  const { email, password, confirmPassword } = request.body;
  let userdata = await model.findOne({
    email: email,
  });
  if (!userdata) {
    if (password === confirmPassword) {
      let data = await encryptPassword(request?.body);
      data = await model.create(data);

      if (data) {
        await removeDataFromRedisClient(feedName);
        return response.status(200).json({
          status: true,
          data,
          message: "User Registered Successfully",
        });
      } else {
        return response.status(400).json({
          status: false,
          msg: "Something went wrong",
        });
      }
    } else {
      return response.status(400).json({
        status: false,
        msg: "Password doesnot match",
      });
    }
  } else {
    return response.status(400).json({
      status: false,
      msg: "User already exists",
    });
  }
};
export const addAdminScript = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response?: any
) => {
  const { email, password, confirmPassword } = request;
  let userdata = await model.findOne({
    email: email,
  });
  if (!userdata) {
    if (password === confirmPassword) {
      let data = await encryptPassword(request);
      data = await model.create(data);

      if (data) {
        await removeDataFromRedisClient(feedName);
        return response?.status(200).json({
          status: true,
          data,
          message: "User Registered Successfully",
        });
      } else {
        return response?.status(400).json({
          status: false,
          msg: "Something went wrong",
        });
      }
    } else {
      return response?.status(400).json({
        status: false,
        msg: "Password doesnot match",
      });
    }
  } else {
    return response?.status(400).json({
      status: false,
      msg: "User already exists",
    });
  }
};

export const getAdmin = async (
  feedName: SchemaNames,
  model: any,
  request: any,
  response: any
) => {
  let { username, password, email } = request.body;
  let userdata = await model.findOne({
    $or: [{ username }, { email }],
  });
  if (userdata) {
    let decryptedPassword = await decryptPassword(userdata.password);
    if (password === decryptedPassword) {
      const token = jwt.sign({ id: userdata._id }, "secretkey");
      const { _id, email, username, role } = userdata;
      await removeDataFromRedisClient(feedName);
      console.log("password", password)

      return response
        .status(200)
        .cookie("WWWtttLLL", token, {
          httpOnly: true,
          // secure: true
          maxAge: 25920000000,
        })
        .json({
          message: "User logged in successfully",
          status: true,
          data: { _id, email, username, role },
          token,
        });
    } else {
      return response.status(401).json({
        status: false,
        msg: "Invalid credentials",
      });
    }
  } else {
    return response.status(401).json({
      status: false,
      msg: "Invalid credentials",
    });
  }
};
