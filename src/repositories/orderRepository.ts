// orderRepository.ts

import mongoose from "mongoose";
import { Order } from "@schemas/Order";
import { newDate } from "@scripts/date";

// 0. cnt ------------------------------------------------------------------------------------------
export const cnt = async (
  order_name_param: string,
  order_phone_param: string,
) => {
  const finalResult = await Order.countDocuments(
    {
      order_name: order_name_param || { $ne: null },
      order_phone: order_phone_param || { $ne: null },
    }
  );

  return finalResult;
};

// 1-1. find ---------------------------------------------------------------------------------------
export const find = async (
  order_name_param: string,
  order_phone_param: string,
) => {
  const finalResult = await Order.aggregate([
    {
      $match: {
        order_name: order_name_param || { $ne: null },
        order_phone: order_phone_param || { $ne: null },
      }
    },
    {
      $project: {
        _id: 1,
        order_number: 1,
        order_category: 1,
        order_name: 1,
        order_email: 1,
        order_phone: 1,
        order_date: 1,
        order_time: 1,
        order_headcount: 1,
        order_total_price: 1,
        order_product: 1,
        order_regDt: 1,
        order_updateDt: 1,
      }
    }
  ]);

  return finalResult;
};

// 1-2. list ---------------------------------------------------------------------------------------
export const list = async (
  order_name_param: string,
  order_phone_param: string,
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Order.aggregate([
    {
      $match: {
        order_name: order_name_param || { $ne: null },
        order_phone: order_phone_param || { $ne: null },
      }
    },
    {
      $project: {
        _id: 1,
        order_number: 1,
        order_category: 1,
        order_name: 1,
        order_email: 1,
        order_phone: 1,
        order_date: 1,
        order_time: 1,
        order_headcount: 1,
        order_total_price: 1,
        order_product: 1,
        order_regDt: 1,
        order_updateDt: 1,
      }
    },
    {
      $sort: {
        order_number: sort_param
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
  const finalResult:any = await Order.findOne(
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
  const finalResult = await Order.create(
    {
      _id: new mongoose.Types.ObjectId(),
      order_category: OBJECT_param.order_category,
      order_name: OBJECT_param.order_name,
      order_email: OBJECT_param.order_email,
      order_phone: OBJECT_param.order_phone,
      order_date: OBJECT_param.order_date,
      order_time: OBJECT_param.order_time,
      order_headcount: OBJECT_param.order_headcount,
      order_total_price: OBJECT_param.order_total_price,
      order_product: OBJECT_param.order_product,
      order_regDt: newDate,
      order_updateDt: null,
    },
  );

  return finalResult;
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Order.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        order_category: OBJECT_param.order_category,
        order_name: OBJECT_param.order_name,
        order_email: OBJECT_param.order_email,
        order_phone: OBJECT_param.order_phone,
        order_date: OBJECT_param.order_date,
        order_time: OBJECT_param.order_time,
        order_headcount: OBJECT_param.order_headcount,
        order_total_price: OBJECT_param.order_total_price,
        order_product: OBJECT_param.order_product,
        order_updateDt: newDate,
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
  const finalResult = await Order.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};
