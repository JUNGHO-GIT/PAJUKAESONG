// noticeRepository.ts

import mongoose from "mongoose";
import { Notice } from "@schemas/notice/Notice";
import { newDate } from "@assets/scripts/date";

// 0. cnt ------------------------------------------------------------------------------------------
export const cnt = async (
) => {
  const finalResult = await Notice.countDocuments(
    {}
  );
  return finalResult;
};

// 1. list -----------------------------------------------------------------------------------------
export const list = async (
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Notice.aggregate([
    {
      $project: {
        _id: 1,
        notice_number: 1,
        notice_title: 1,
        notice_content: 1,
        notice_view: 1,
        notice_regDt: 1,
        notice_updateDt: 1,
      }
    },
    {
      $sort: {
        notice_number: sort_param
      }
    },
    {
      $skip: (Number(page_param) - 1)
    }
  ])

  return finalResult;
};

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async (
  _id_param: string,
) => {
  const finalResult = await Notice.findOne(
    {
      _id: _id_param,
    }
  )
  .lean();

  return finalResult;
};

// 3. save -----------------------------------------------------------------------------------------
export const save = async (
  OBJECT_param: any,
) => {
  const finalResult = await Notice.create(
    {
      _id: new mongoose.Types.ObjectId(),
      notice_title: OBJECT_param.notice_title,
      notice_content: OBJECT_param.notice_content,
      notice_regDt: newDate,
      notice_updateDt: "",
    }
  );

  return finalResult;
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Notice.updateOne(
    {
      _id: _id_param
    },
    {
      $set: {
        notice_title: OBJECT_param.notice_title,
        notice_content: OBJECT_param.notice_content,
        notice_updateDt: newDate,
      }
    },
    {
      upsert: true,
      new: true
    }
  )
  .lean();

  return finalResult;
};

// 5. deletes --------------------------------------------------------------------------------------
export const deletes = async (
  _id_param: string,
) => {
  const finalResult = await Notice.deleteOne(
    {
      _id: _id_param
    }
  );

  return finalResult;
};
