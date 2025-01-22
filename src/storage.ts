import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import fs from "fs";

//@desc image destination and filename

export const FileStorage = (path: string) => {
  const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
      // setting destination of uploading files
      if (file.fieldname === "pdfLink") {
        // if uploading resume
        fs.mkdirSync(path + "/pdf", { recursive: true });
        cb(null, path);
      } else {
        // else uploading image
        fs.mkdirSync(path + "/images", { recursive: true });
        cb(null, path);
      }
    },
    filename: (req: Request, file: any, cb: any) => {
      cb(null, Date.now() + file.originalname);
    },
  });

  //@desc filters of file type
  const fileFilter = (req: Request, file: any, cb: any) => {
    if (file.fieldname === "pdfLink") {
      // if uploading pdf
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        cb(null, false); // else fails
      }
    } else {
      // else uploading image
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        // check file type to be png, jpeg, or jpg
        cb(null, true);
      } else {
        cb(null, false); // else fails
      }
    }
  };

  const uploadFile = multer({
    storage: storage,
    fileFilter: fileFilter,
  });
  return uploadFile;
};
