import express, { NextFunction, Request, Response } from "express";

import { SchemaNames } from "../../interface/Feeds";
import WhitelistSchema from "../../models/WhiteList/newReutersBlacklist";

class Route {
  public path: SchemaNames = "whitelist";
  public router = express.Router();
  public schema = WhitelistSchema;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/${this.path}/`, this.getlist);
    this.router.get(`/getTotal/${this.path}/`, this.getTotalWhitelist);
    this.router.get(`/${this.path}/:_id`, this.getById);
    this.router.post(`/${this.path}`, this.add);
    this.router.put(`/${this.path}/:_id`, this.update);
    this.router.delete(`/${this.path}/:_id`, this.delete);
  }

  private getlist = async (
    request: any,
    response: Response,
    next: NextFunction
  ) => {
    try {
      let { page, items_per_page } = request.query as {
        page: number | undefined;
        items_per_page: number | undefined;
      };
      let data;
      let dataTotal;
      const search = request.query.search
      if (page !== undefined && items_per_page !== undefined) {
        if (search) {
          data = await this.schema.find({ keyword: { $regex: search, $options: "i" } }).sort({ createdAt: -1 }).skip((Number(page) - 1) * Number(items_per_page)).limit(Number(items_per_page));
          dataTotal = await this.schema.find({ keyword: { $regex: search, $options: "i" } }).count();

        } else {
          data = await this.schema.find({}).sort({ createdAt: -1 }).skip((Number(page) - 1) * Number(items_per_page)).limit(Number(items_per_page));
          dataTotal = await this.schema.find({}).count();

        }
      } else {
        if (search) {
          data = await this.schema.find({ keyword: { $regex: search, $options: "i" } }).sort({ createdAt: -1 }).limit(Number(items_per_page));
          dataTotal = await this.schema.find({ keyword: { $regex: search, $options: "i" } }).count();

        } else {
          data = await this.schema.find({}).sort({ createdAt: -1 }).limit(Number(items_per_page));
          dataTotal = await this.schema.find({}).count();

        }
      }
      response.status(200).json({
        status: true,
        data: data,
        totalData: dataTotal

      });
    } catch (error: any) {
      response.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  };
  private getById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const _id = request?.params?._id;
      const data = await this.schema.findOne({ _id });
      response.status(200).json({
        status: true,
        data: data,
      });
    } catch (error: any) {
      response.status(500).json({
        status: false,
        msg: error.message,
      });
    }
  };

  private getTotalWhitelist = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.schema.count();
      response.status(200).json({
        status: true,
        data: data,
      });
    } catch (error: any) {
      // console.log(error)
      response.status(400).json({
        status: false,
        msg: error.message,
      });
    }
  };

  private add = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const whitelistRes = new this.schema(request.body)
      const data = await whitelistRes.save()
      response.status(200).json({
        status: true,
        data: data,
      });
    } catch (err: any) {
      return response.status(400).json({
        status: false,
        msg: err.message,
      });
    }
  };

  private update = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.schema.findByIdAndUpdate({ _id: request.params._id }, { $set: { active: request.body.active, keyword: request.body.keyword } }, { new: true })
      response.status(201).send({
        status: true,
        data: data,
      })
    } catch (error: any) {
      response.status(400).json({
        status: false,
        msg: error.message,
      });
    }
  };
  private delete = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const deleteProducts = await this.schema.findByIdAndDelete({ _id: request.params._id })
      response.status(201).send({
        status: true,
        message: "Successfully Deleted",
      })
    } catch (error: any) {
      response.status(400).json({
        status: false,
        msg: error.message,
      });
    }
  };
}

export default Route;
