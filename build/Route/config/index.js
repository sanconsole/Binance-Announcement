"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var configRouter = express_1.default.Router();
// configRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     await getOrSaveDataToRedishClient(
//       "fastreveal",
//       req.query,
//       configModel,
//       res
//     );
//   } catch (err: any) {
//     return res.status(500).send({
//       err: err.message,
//     });
//   }
// });
// configRouter.get("/:key", async (req: Request, res: Response) => {
//   try {
//     const { key } = req.params;
//     let item = await configModel.find();
//     if (!item) {
//       return res.status(404).send({ message: "Item not found" });
//     }
//     return res.status(200).send(item);
//   } catch (err: any) {
//     return res.status(500).send({
//       err: err.message,
//     });
//   }
// });
exports.default = configRouter;
