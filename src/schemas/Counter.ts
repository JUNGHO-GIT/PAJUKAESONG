// Counter.ts

import mongoose from "mongoose";

// -------------------------------------------------------------------------------------------------
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

// -------------------------------------------------------------------------------------------------
export const incrementSeq = async (sequenceName: string, modelName: string) => {

  // 1. Model과 Counter 초기화
  const Model = mongoose.model(modelName);
  const Counter = mongoose.model("Counter", schema);

  // 2. 최신 sequence 값을 가져오기
  const latestFindResult:any = await Model.findOne({ [sequenceName]: { $exists: true } })
  .sort({ [sequenceName]: -1 })
  .lean();

  const latestResult = latestFindResult ? latestFindResult[sequenceName] : 0;

  // 3. Counter에서 해당 sequenceName 존재 여부 확인
  let existingFindResult = await Counter.findOne({ seq_collection: modelName }).lean();

  // 4. Counter 업데이트 또는 새로운 Counter 생성
  let existingUpdateResult:any = null;
  if (!existingFindResult) {
    const newCounterData:any  = {
      seq_collection: modelName,
      seq_number: latestResult + 1,
    };
    newCounterData[sequenceName] = latestResult + 1;
    existingUpdateResult = await Counter.create(newCounterData);
  }
  else {
    existingUpdateResult = await Counter.findOneAndUpdate(
      { seq_collection: modelName },
      { $set: { [sequenceName]: latestResult + 1, seq_number: latestResult + 1 } },
      { new: true }
    );
  }

  // 5. 최종 결과 반환
  return existingUpdateResult ? existingUpdateResult[sequenceName] : null;
};
