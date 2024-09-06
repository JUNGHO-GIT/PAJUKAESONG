// About.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    about_number : {
      type : Number,
      default: 0,
      unique : true
    },

    // 인사말
    about_greeting_content: {
      type: String,
      default: "",
      required: false
    },
    about_greeting_image: {
      type: String,
      default: "",
      required: false
    },

    // 소개
    about_introduce_content: {
      type: String,
      default: "",
      required: false
    },
    about_introduce_image: {
      type: String,
      default: "",
      required: false
    },

    // 위치
    about_location_coordinate: {
      type: String,
      default: "",
      required: false
    },
    about_location_image: {
      type: String,
      default: "",
      required: false
    },

    about_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    about_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "About",
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.about_number = await incrementSeq("about_number", "About");
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const About = mongoose.model(
  "About", schema,
);