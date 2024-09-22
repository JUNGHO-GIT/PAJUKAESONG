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
    about_greeting: {
      type: String,
      default: "",
      required: false
    },
    about_info: {
      type: String,
      default: "",
      required: false
    },
    about_location: {
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
    timestamps: {
      createdAt: "about_regDt",
      updatedAt: "about_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.about_number = await incrementSeq("about_number", "About") ?? 0;
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const About = mongoose.model(
  "About", schema,
);