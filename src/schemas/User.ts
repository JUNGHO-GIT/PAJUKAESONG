// User.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    user_number : {
      type : Number,
      default: 1,
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
    user_name : {
      type : String,
      default: "",
      required : false
    },
    user_email : {
      type : String,
      default: "",
      required : false
    },
    user_phone : {
      type : String,
      default: "",
      required : false
    },
    user_address : {
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
  },
  {
    collection: "User",
    timestamps: {
      createdAt: "user_regDt",
      updatedAt: "user_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.user_number = await incrementSeq("user_number", "User") ?? 0;
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const User = mongoose.model(
  "User", schema,
);