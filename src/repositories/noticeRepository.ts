// noticeRepository.ts

import mongoose from "mongoose";
import { Notice } from "@schemas/Notice";
import { newDate } from "@scripts/date";

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
      $skip: (page_param) * 10
    },
    {
      $limit: 10
    }
  ]);

  return finalResult;
};

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async (
  _id_param: string,
) => {

  // notice_view 조회
  const findView:any = await Notice.findOne(
    {
      _id: _id_param
    }
  )
  .lean();

  // notice_view 형변환
  const viewResult = !findView.notice_view ? 0 : parseInt(findView.notice_view);

  // notice_view + 1
  const finalResult:any = await Notice.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        notice_view: viewResult + 1
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
      notice_updateDt: null,
    },
  );

  return finalResult;
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Notice.findOneAndUpdate(
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
  const finalResult = await Notice.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};
