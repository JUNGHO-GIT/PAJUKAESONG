// User.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
declare type UserType = mongoose.Document & {
	user_number: number;
	user_id: string;
	user_token: string;
	user_pw: string;
	user_name: string;
	user_email: string;
	user_phone: string;
	user_address: string;
	user_regDt: Date;
	user_updateDt: Date;
}

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
    collection: "user",
    timestamps: {
      createdAt: "user_regDt",
      updatedAt: "user_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre<UserType>("save", async function() {
  if (this.isNew) {
    this.user_number = await incrementSeq("user_number", "user");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const User = mongoose.model<UserType>("user", schema);