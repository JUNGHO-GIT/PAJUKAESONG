// Franchise.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
declare type FranchiseType = mongoose.Document & {
	franchise_number: number;
	franchise_seq: number;
	franchise_name: string;
	franchise_address_main: string;
	franchise_address_detail: string;
	franchise_phone: string;
	franchise_images: any[];
	franchise_regDt: Date;
	franchise_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    franchise_number : {
      type : Number,
      default: 1,
      unique : true
    },
    franchise_seq: {
      type: Number,
      default: 0,
      required: false
    },

    franchise_name: {
      type: String,
      default: "",
      required: false
    },
    franchise_address_main: {
      type: String,
      default: "",
      required: false
    },
    franchise_address_detail: {
      type: String,
      default: "",
      required: false
    },
    franchise_phone: {
      type: String,
      default: "",
      required: false
    },
    franchise_images: {
      type: Array,
      default: [],
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
  },
  {
    collection: "Franchise",
    timestamps: {
      createdAt: "franchise_regDt",
      updatedAt: "franchise_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre<FranchiseType>("save", async function() {
  if (this.isNew) {
    this.franchise_number = await incrementSeq("franchise_number", "Franchise");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const Franchise = mongoose.model<FranchiseType>("Franchise", schema);