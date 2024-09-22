// Order.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    order_number : {
      type : Number,
      default: 0,
      unique : true
    },

    // 주문 상품
    order_buy_name: {
      type: String,
      default: "",
      required: false
    },
    order_buy_count: {
      type: String,
      default: "",
      required: false
    },
    order_buy_price: {
      type: String,
      default: "",
      required: false
    },


    // 주문자 정보
    order_lookup_name: {
      type: String,
      default: "",
      required: false
    },
    order_lookup_email: {
      type: String,
      default: "",
      required: false
    },
    order_lookup_phone: {
      type: String,
      default: "",
      required: false
    },
    order_lookup_account: {
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
    this.order_number = await incrementSeq("order_number", "Order") ?? 0;
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const Order = mongoose.model(
  "Order", schema,
);