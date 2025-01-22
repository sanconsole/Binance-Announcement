import * as mongoose from "mongoose";

//const {isEmail} = require('validator')

const RoleSchema = new mongoose.Schema({
  roleType: {
    type: String,
    required: true,
    unique: true
  },
  rolePermissions: {
    type: [{
      RoleManagement: [String],
      TwitterManagement:[String],
      AutomationFeeds:[String],
      DiscordManagement:[String],
      TelegramManagement:[String],
      UserManagement: [String],
      BlackList: [String],
      WhiteList: [String],
    }],
    required: true
  }
}, { timestamps: true });

export const rolesRoutes = ["TwitterManagement", "DiscordManagement", "RoleManagement", "TelegramManagement", "AutomationFeeds", "UserManagement", "BlackList", "WhiteList"]

const Role = mongoose.model("Roles", RoleSchema);

export default Role;
