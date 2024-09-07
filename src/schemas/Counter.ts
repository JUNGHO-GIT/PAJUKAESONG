// Counter.ts

import mongoose from "mongoose";

// 1. schema ---------------------------------------------------------------------------------------
const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "",
      required: false,
    },
    seq: {
      type: Number,
      default: 0,
      unique: false,
    },
  },
  {
    collection: "Counter",
  }
);

const Counter = mongoose.model("Counter", schema);

export const incrementSeq = async (sequenceName: string, modelName: string) => {
  const Model = mongoose.model(modelName);
  const latestDoc = await Model.findOne().sort({ [sequenceName]: -1 }).exec();
  const latestSeq = latestDoc ? latestDoc[sequenceName] : 0;

  const updateDt = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  ).exec();

  if (updateDt.seq <= latestSeq) {
    const updatedCounter:any = await Counter.findOneAndUpdate(
      { _id: sequenceName },
      { seq: latestSeq + 1 },
      { new: true }
    ).exec();

    return updatedCounter.seq;
  }

  return updateDt.seq;
};
