// Contact.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    contact_number : {
      type : Number,
      default: 0,
      unique : true
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
    collection: "Contact",
    timestamps: {
      createdAt: "contact_regDt",
      updatedAt: "contact_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre("save", async function(next) {
  if (this.isNew) {
    this.contact_number = await incrementSeq("contact_number", "Contact") ?? 0;
  }
  next();
});

// 5. model ----------------------------------------------------------------------------------------
export const Contact = mongoose.model(
  "Contact", schema,
);