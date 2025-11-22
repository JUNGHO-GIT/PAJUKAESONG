// Order.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
declare type OrderProductType = {
	product_name: string;
	product_count: string;
	product_price: string;
	product_images: any[];
}
declare type OrderType = mongoose.Document & {
	order_number: number;
	order_category: string;
	order_name: string;
	order_email: string;
	order_phone: string;
	order_date: string;
	order_time: string;
	order_headcount: string;
	order_total_price: string;
	order_product: OrderProductType[];
	order_regDt: Date;
	order_updateDt: Date;
}

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
    order_time: {
      type: String,
      default: "",
      required: false
    },
    order_headcount: {
      type: String,
      default: "",
      required: false
    },
    order_total_price: {
      type: String,
      default: "",
      required: false
    },
    order_product: [{
      product_name: {
        type: String,
        default: "",
        required: false
      },
      product_count: {
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
      }
    }],

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
schema.pre<OrderType>("save", async function() {
  if (this.isNew) {
    this.order_number = await incrementSeq("order_number", "Order");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const Order = mongoose.model<OrderType>("Order", schema);