// Notice.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    notice_number : {
      type : Number,
      default: 0,
      unique : true
    },

    notice_title: {
      type: String,
      default: "",
      required: false
    },
    notice_content: {
      type: String,
      default: "",
      required: false
    },
    notice_view: {
      type: String,
      default: "0",
      required: false
    },
    notice_images: {
      type: Array,
      default: [],
      required: false
    },

    notice_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    notice_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "Notice",
    timestamps: {
      createdAt: "notice_regDt",
      updatedAt: "notice_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.notice_number = await incrementSeq("notice_number", "Notice") ?? 0;
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const Notice = mongoose.model(
  "Notice", schema
);