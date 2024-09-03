// Franchise.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema({

  franchise_number : {
    type : Number,
    default: 0,
    unique : true
  },

  // 가맹점
  franchise_branch_name: {
    type: String,
    default: "",
    required: false
  },
  franchise_branch_address: {
    type: String,
    default: "",
    required: false
  },
  franchise_branch_phone: {
    type: String,
    default: "",
    required: false
  },
  franchise_branch_image: {
    type: String,
    default: "",
    required: false
  },

  // 가맹문의
  franchise_inquiry_name: {
    type: String,
    default: "",
    required: false
  },
  franchise_inquiry_email: {
    type: String,
    default: "",
    required: false
  },
  franchise_inquiry_phone: {
    type: String,
    default: "",
    required: false
  },
  franchise_inquiry_title: {
    type: String,
    default: "",
    required: false
  },
  franchise_inquiry_content: {
    type: String,
    default: "",
    required: false
  },

  franchise_regDt: {
    type: Date,
    default: Date.now,
    required: false
  },
  franchise_updateDt: {
    type: Date,
    default: Date.now,
    required: false
  }
});

// 3. counter --------------------------------------------------------------------------------------
// @ts-ignore
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.franchise_number = await incrementSeq("franchise_number", "Franchise");
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const Franchise = mongoose.model(
  "Franchise", schema, "franchise"
);