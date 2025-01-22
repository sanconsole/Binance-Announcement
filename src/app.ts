import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { Server } from "socket.io";

import whitelistRoutes from "./Route/Whitelist/index";
import blacklistRoutes from "./Route/Blacklist/index";




// import logger from 'express-logger';
/* eslint-disable no-var-requires */
require("dotenv").config();
// const logger = require('express-logger')
const { DB_URL } = process.env;
morgan.token("id", (req: any) => {
  const username = req.headers["username"] as string;
  return username;
});

class App {
  public app: express.Application;
  private PORT: number;
  private dbUrl = DB_URL as string;
  public IO: Server | null = null;
  private ALLOWEDLIST = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://priapusiq.com",
    "https://piqsuite.com",
    "https://test.piqsuite.com",
    "https://www.piqsuite.com",
    "https://www.test.piqsuite.com",
    "https://beta.piqsuite.com",
    "https://www.beta.piqsuite.com",
    "https://admin.priapusiq.com",
    "https://automation-admin.priapusiq.com",
    "https://89d1697de324e4d41ea4b33ffea165ef.piqsuite.com",
    "https://dev-admin-panel.piqsuite.com",
  ];
  private CORSOPTION = {
    origin: (origin: any, callback: any) => {
      if (this.ALLOWEDLIST.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials
  };

  constructor(routes: any, port: any) {
    this.app = express();
    this.config();
    this.initializeRoutes(routes);
    this.PORT = port;
  }

  private config = async (): Promise<any> => {
    this.app.use(cors(this.CORSOPTION));
    this.app.use((req, res, next) => {
      if (req.originalUrl.startsWith("/stripe/webhook")) {
        next();
      } else {
        express.json()(req, res, next);
      }
    });

    this.app.use(cookieParser());
    this.app.use(
      morgan(
        `[Username: :id ] [Remote IP: :remote-addr ] [Method: :method ] [Url: :url ] [Status: :status ] [HTTP Version: HTTP/:http-version ] [Content Length: :res[content-length] ] [Referer: :referrer ]  [User Agent: :user-agent ] [Remote User: :remote-user ] [Date Time: :date[clf] ] - [Response Time: :response-time ms ] \n`
      )
    );
    this.app.use(
      session({ secret: "whatever", resave: true, saveUninitialized: true })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use("/assets", express.static(path.join(`${__dirname}/assets`)));
    this.app.use("/uploads", express.static("uploads"));

    await mongoose.connect(this.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected to mongodb server");
  };

  private initializeRoutes = (routes: any): void => {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("X-Frame-Options", "Deny");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
      }
      next();
    });

    routes.forEach((route: any) => {
      this.app.use("/", route.router);
    });
 


    // blacklist routes
    const blacklistRoute = new blacklistRoutes();
    this.app.use("/api", blacklistRoute.router);
    // whitelist routes
    const whitelistRoute = new whitelistRoutes();
    this.app.use("/api", whitelistRoute.router);
    
  };

  public listen = (): void => {
    const server = this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });

    const io = new Server(server, {
      cors: {
        origin: this.ALLOWEDLIST,
        credentials: true,
      },
    });
    this.IO = io;
    this.app.set("IO", io);
  };
}

export default App;
// 2.1.13
