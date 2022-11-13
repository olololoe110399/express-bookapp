const mongoose = require("mongoose");
const config = require("../config/base.config");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const UserSchema = Schema({
  username: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  created: {
    type: Date,
    default: Date.now(),
  },
},
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  });

UserSchema.pre("save", function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(config.numberOfroundsSalt, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const TodoModel = mongoose.model("User", UserSchema, "users");

module.exports = TodoModel;
