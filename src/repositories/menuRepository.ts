// menuRepository.ts

import mongoose from "mongoose";
import { Menu } from "@schemas/Menu";
import { newDate } from "@scripts/date";

// 0. cnt ------------------------------------------------------------------------------------------
export const cnt = async (
  category_param: string,
) => {
  const finalResult = await Menu.countDocuments(
    {
      menu_category: category_param
    }
  );

  return finalResult;
};

// 1. list -----------------------------------------------------------------------------------------
export const list = async (
  category_param: string,
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Menu.aggregate([
    {
      $match: {
        menu_category: category_param
      }
    },
    {
      $project: {
        _id: 1,
        menu_number: 1,
        menu_seq: 1,
        menu_category: 1,
        menu_name: 1,
        menu_description: 1,
        menu_price: 1,
        menu_images: 1,
      }
    },
    {
      $sort: {
        menu_seq: sort_param
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
      menu_seq: OBJECT_param.menu_seq,
      menu_category: OBJECT_param.menu_category,
      menu_name: OBJECT_param.menu_name,
      menu_description: OBJECT_param.menu_description,
      menu_price: OBJECT_param.menu_price,
      menu_images: OBJECT_param.menu_images,
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
        menu_seq: OBJECT_param.menu_seq,
        menu_category: OBJECT_param.menu_category,
        menu_name: OBJECT_param.menu_name,
        menu_description: OBJECT_param.menu_description,
        menu_price: OBJECT_param.menu_price,
        menu_images: OBJECT_param.menu_images,
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

// 5. delete ---------------------------------------------------------------------------------------
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