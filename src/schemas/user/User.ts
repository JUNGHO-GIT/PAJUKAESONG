// User.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema({

  user_number : {
    type : Number,
    default: 0,
    unique : true
  },

  user_id: {
    type: String,
    default: "",
    required: false
  },
  user_token: {
    type: String,
    default: "",
    required: false
  },
  user_pw : {
    type : String,
    default: "",
    required : false
  },

  user_regDt: {
    type: Date,
    default: Date.now,
    required: false
  },
  user_updateDt: {
    type: Date,
    default: Date.now,
    required: false
  }
});

// 3. counter --------------------------------------------------------------------------------------
// @ts-ignore
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.user_number = await incrementSeq("user_number", "User");
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const User = mongoose.model(
  "User", schema, "user"
);