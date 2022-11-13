const RoleModel = require("../models/role.model");
const logger = require("../utils/logger");
const RoleService = {};

RoleService.ROLES = ["user", "admin", "moderator"];

RoleService.initial = () => {
  RoleModel.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      RoleService.ROLES.forEach((value) => {
        RoleModel({
          name: value,
        }).save((err) => {
          if (err) {
            logger.error(err.stack);
          }
          logger.info(`added '${value}' to roles collection`);
        });
      });
    }
  });
};

module.exports = RoleService;
