const mongoose = require("mongoose");

const { Schema } = mongoose;

const RoleSchema = Schema({
  name: String,
});

const RoleModel = mongoose.model("Role", RoleSchema, "roles");

module.exports = RoleModel;
