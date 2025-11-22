// Menu.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
declare type MenuType = mongoose.Document & {
	menu_number: number;
	menu_seq: number;
	menu_category: string;
	menu_name: string;
	menu_description: string;
	menu_price: string;
	menu_images: any[];
	menu_regDt: Date;
	menu_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    menu_number : {
      type : Number,
      default: 1,
      unique : true
    },
    menu_seq: {
      type: Number,
      default: 0,
      required: false
    },

    menu_category: {
      type: String,
      default: "",
      required: false
    },
    menu_name: {
      type: String,
      default: "",
      required: false
    },
    menu_description: {
      type: String,
      default: "",
      required: false
    },
    menu_price: {
      type: String,
      default: "",
      required: false
    },
    menu_images: {
      type: Array,
      default: [],
      required: false
    },

    menu_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    menu_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "Menu",
    timestamps: {
      createdAt: "menu_regDt",
      updatedAt: "menu_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre<MenuType>("save", async function() {
  if (this.isNew) {
    this.menu_number = await incrementSeq("menu_number", "Menu");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const Menu = mongoose.model<MenuType>("Menu", schema);