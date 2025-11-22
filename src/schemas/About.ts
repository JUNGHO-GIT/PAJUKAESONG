// About.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
interface AboutDoc extends mongoose.Document {
  about_number: number;
  about_greeting: string;
  about_info: string;
  about_location: string;
  about_regDt: Date;
  about_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    about_number : {
      type : Number,
      default: 1,
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
schema.pre<AboutDoc>("save", async function() {
  if (this.isNew) {
    this.about_number = await incrementSeq("about_number", "About");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const About = mongoose.model<AboutDoc>("About", schema);