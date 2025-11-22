// Admin.ts

import mongoose from "mongoose";
import { incrementSeq } from "@schemas/Counter";

// 0. types ---------------------------------------------------------------------------------------
interface AdminSectionDoc {
  admin_visit_ip: string;
}
interface AdminDoc extends mongoose.Document {
  admin_number: number;
  admin_date: string;
  adminSection: AdminSectionDoc[];
  admin_regDt: Date;
  admin_updateDt: Date;
}

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    admin_number : {
      type : Number,
      default: 1,
      unique : true
    },

    admin_date: {
      type: String,
      default: "",
      required: false
    },
    adminSection: [
      {
        _id: false,
        admin_visit_ip: {
          type: String,
          default: "",
          required: false
        },
      }
    ],
    admin_regDt: {
      type: Date,
      default: Date.now,
      required: false
    },
    admin_updateDt: {
      type: Date,
      default: Date.now,
      required: false
    }
  },
  {
    collection: "Admin",
    timestamps: {
      createdAt: "admin_regDt",
      updatedAt: "admin_updateDt"
    },
  }
);

// 3. counter --------------------------------------------------------------------------------------
schema.pre<AdminDoc>("save", async function() {
  if (this.isNew) {
    this.admin_number = await incrementSeq("admin_number", "Admin");
  }
});

// 5. model ----------------------------------------------------------------------------------------
export const Admin = mongoose.model<AdminDoc>("Admin", schema);