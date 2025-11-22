// Product.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
declare type ProductType = mongoose.Document & {
	product_number: number;
	product_seq: number;
	product_category: string;
	product_name: string;
	product_description: string;
	product_price: string;
	product_images: any[];
	product_regDt: Date;
	product_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    product_number : {
      type : Number,
      default: 1,
      unique : true
    },
    product_seq: {
      type: Number,
      default: 0,
      required: false
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
schema.pre<ProductType>("save", async function() {
  if (this.isNew) {
    this.product_number = await incrementSeq("product_number", "Product");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const Product = mongoose.model<ProductType>("Product", schema);