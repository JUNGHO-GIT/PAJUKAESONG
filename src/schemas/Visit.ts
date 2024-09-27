// Visit.ts

import mongoose from "mongoose";

// -------------------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    visit_date: {
      type: String,
      default: "",
      required: false
    },
    visit_ip: {
      type: String,
      default: "",
      required: false
    },
    visit_count: {
      type: Number,
      default: 0,
      required: false
    }
  },
  {
    collection: "Visit"
  }
);

// 5. model ----------------------------------------------------------------------------------------
export const Visit = mongoose.model(
  "Visit", schema
);