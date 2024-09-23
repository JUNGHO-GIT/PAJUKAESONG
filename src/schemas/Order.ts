// Order.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    order_number : {
      type : Number,
      default: 1,
      unique : true
    },

    order_category: {
      type: String,
      default: "",
      required: false
    },
    order_name: {
      type: String,
      default: "",
      required: false
    },
    order_email: {
      type: String,
      default: "",
      required: false
    },
    order_phone: {
      type: String,
      default: "",
      required: false
    },
    order_date: {
      type: String,
      default: "",
      required: false
    },

    order_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    order_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "Order",
    timestamps: {
      createdAt: "order_regDt",
      updatedAt: "order_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.order_number = await incrementSeq("order_number", "Order");
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const Order = mongoose.model(
  "Order", schema,
);