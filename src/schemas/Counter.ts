// Counter.ts

import mongoose from "mongoose";

// Counter model schema
const schema = new mongoose.Schema(
  {
    seq_collection: {
      type: String,
      required: true,
      unique: true,
    },
    seq_number: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "Counter",
  }
);

const Counter = mongoose.model("Counter", schema);

export const incrementSeq = async (sequenceName: string, modelName: string) => {
  const Model = mongoose.model(modelName);

  const latestDoc = await Model.findOne().sort({ [sequenceName]: -1 })
  const latestSeq = latestDoc ? latestDoc[sequenceName] : 0;

  const updateSeq = await Counter.findOneAndUpdate(
    { seq_collection: modelName },
    { $inc: { seq_number: 1 } },
    { new: true, upsert: true }
  )
  .lean()

  if (updateSeq.seq_number <= latestSeq) {
    const correctedSeq = await Counter.findOneAndUpdate(
      { seq_collection: modelName },
      { seq_number: latestSeq + 1 },
      { new: true }
    )
    .lean()

    return correctedSeq && correctedSeq.seq_number;
  }

  // Return the updated sequence number
  return updateSeq && updateSeq.seq_number;
};
