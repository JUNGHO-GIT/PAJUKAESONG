// Notice.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
interface NoticeDoc extends mongoose.Document {
  notice_number: number;
  notice_title: string;
  notice_content: string;
  notice_view: string;
  notice_images: any[];
  notice_regDt: Date;
  notice_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    notice_number : {
      type : Number,
      default: 1,
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
schema.pre<NoticeDoc>("save", async function() {
  if (this.isNew) {
    this.notice_number = await incrementSeq("notice_number", "Notice");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const Notice = mongoose.model<NoticeDoc>("Notice", schema);