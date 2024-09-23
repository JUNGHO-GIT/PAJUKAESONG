// productRepository.ts

import mongoose from "mongoose";
import { Product } from "@schemas/Product";
import { newDate } from "@scripts/date";

// 0. cnt ------------------------------------------------------------------------------------------
export const cnt = async (
) => {
  const finalResult = await Product.countDocuments(
  );

  return finalResult;
};

// 1. list -----------------------------------------------------------------------------------------
// page는 무조건 0부터 시작
// 빈값은 [] 리턴
export const list = async (
  category_param: string,
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Product.aggregate([
    {
      $match: {
        product_category: category_param
      }
    },
    {
      $project: {
        _id: 1,
        product_number: 1,
        product_category: 1,
        product_name: 1,
        product_description: 1,
        product_price: 1,
        product_images: 1,
      }
    },
    {
      $sort: {
        product_number: sort_param
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
  const finalResult:any = await Product.findOne(
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
  const finalResult = await Product.create(
    {
      _id: new mongoose.Types.ObjectId(),
      product_category: OBJECT_param.product_category,
      product_name: OBJECT_param.product_name,
      product_description: OBJECT_param.product_description,
      product_price: OBJECT_param.product_price,
      product_images: OBJECT_param.product_images,
      product_regDt: newDate,
      product_updateDt: null,
    },
  );

  return finalResult;
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Product.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        product_category: OBJECT_param.product_category,
        product_name: OBJECT_param.product_name,
        product_description: OBJECT_param.product_description,
        product_price: OBJECT_param.product_price,
        product_images: OBJECT_param.product_images,
        product_updateDt: newDate,
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
  const finalResult = await Product.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};