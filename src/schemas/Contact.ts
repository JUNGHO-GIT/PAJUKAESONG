// Contact.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
declare type ContactType = mongoose.Document & {
	contact_number: number;
	contact_category: string;
	contact_name: string;
	contact_email: string;
	contact_phone: string;
	contact_title: string;
	contact_content: string;
	contact_images: any[];
	contact_regDt: Date;
	contact_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    contact_number : {
      type : Number,
      default: 1,
      unique : true,
    },

    contact_category: {
      type: String,
      default: "",
      required: false
    },
    contact_name: {
      type: String,
      default: "",
      required: false
    },
    contact_email: {
      type: String,
      default: "",
      required: false
    },
    contact_phone: {
      type: String,
      default: "",
      required: false
    },
    contact_title: {
      type: String,
      default: "",
      required: false
    },
    contact_content: {
      type: String,
      default: "",
      required: false
    },
    contact_images: {
      type: Array,
      default: [],
      required: false
    },

    contact_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    contact_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "contact",
    timestamps: {
      createdAt: "contact_regDt",
      updatedAt: "contact_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre<ContactType>("save", async function() {
  if (this.isNew) {
    this.contact_number = await incrementSeq("contact_number", "contact");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const Contact = mongoose.model<ContactType>("contact", schema);