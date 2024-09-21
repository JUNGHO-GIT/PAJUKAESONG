// menuRepository.ts

import mongoose from "mongoose";
import { Menu } from "@schemas/Menu";
import { newDate } from "@scripts/date";

// 0. cnt ------------------------------------------------------------------------------------------
export const cnt = async (
) => {
  const finalResult = await Menu.countDocuments(
  );

  return finalResult;
};

// 1. list -----------------------------------------------------------------------------------------
// page는 무조건 0부터 시작
// 빈값은 [] 리턴
export const list = async (
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Menu.aggregate([
    {
      $project: {
        _id: 1,
        menu_number: 1,
        menu_category: 1,
        menu_title: 1,
        menu_content: 1,
        menu_price: 1,
        menu_image: 1,
      }
    },
    {
      $sort: {
        menu_number: sort_param
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
  const finalResult:any = await Menu.findOne(
    {
      _id: _id_param
    }
  )
  .lean();

  return finalResult;
};

// 3. save -----------------------------------------------------------------------------------------
export const save = async (
  OBJECT_param: any,
) => {
  const finalResult = await Menu.create(
    {
      _id: new mongoose.Types.ObjectId(),
      menu_category: OBJECT_param.menu_category,
      menu_title: OBJECT_param.menu_title,
      menu_content: OBJECT_param.menu_content,
      menu_price: OBJECT_param.menu_price,
      menu_image: OBJECT_param.menu_image,
      menu_regDt: newDate,
      menu_updateDt: null,
    },
  );

  return finalResult;
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Menu.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        menu_category: OBJECT_param.menu_category,
        menu_title: OBJECT_param.menu_title,
        menu_content: OBJECT_param.menu_content,
        menu_price: OBJECT_param.menu_price,
        menu_image: OBJECT_param.menu_image,
        menu_updateDt: newDate,
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
  const finalResult = await Menu.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};