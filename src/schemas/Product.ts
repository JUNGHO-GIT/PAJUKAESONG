// Product.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    product_number : {
      type : Number,
      default: 1,
      unique : true
    },
    product_category: {
      type: String,
      default: "",
      required: false
    },
    product_name: {
      type: String,
      default: "",
      required: false
    },
    product_description: {
      type: String,
      default: "",
      required: false
    },
    product_price: {
      type: String,
      default: "",
      required: false
    },
    product_images: {
      type: Array,
      default: [],
      required: false
    },

    product_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    product_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "Product",
    timestamps: {
      createdAt: "product_regDt",
      updatedAt: "product_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.product_number = await incrementSeq("product_number", "Product");
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const Product = mongoose.model(
  "Product", schema
);