// franchiseRepository.ts

import mongoose from "mongoose";
import { Franchise } from "@schemas/Franchise";
import { newDate } from "@scripts/date";

// 0. cnt ------------------------------------------------------------------------------------------
export const cnt = async (
) => {
  const finalResult = await Franchise.countDocuments(
  );

  return finalResult;
};

// 1. list -----------------------------------------------------------------------------------------
export const list = async (
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Franchise.aggregate([
    {
      $project: {
        _id: 1,
        franchise_number: 1,
        franchise_seq: 1,
        franchise_name: 1,
        franchise_address_main: 1,
        franchise_address_detail: 1,
        franchise_phone: 1,
        franchise_images: 1,
        franchise_updateDt: 1,
      }
    },
    {
      $sort: {
        franchise_seq: sort_param
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
  const finalResult:any = await Franchise.findOne(
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
  const finalResult = await Franchise.create(
    {
      _id: new mongoose.Types.ObjectId(),
      franchise_seq: OBJECT_param.franchise_seq,
      franchise_name: OBJECT_param.franchise_name,
      franchise_address_main: OBJECT_param.franchise_address_main,
      franchise_address_detail: OBJECT_param.franchise_address_detail,
      franchise_phone: OBJECT_param.franchise_phone,
      franchise_images: OBJECT_param.franchise_images,
      franchise_regDt: newDate,
      franchise_updateDt: null,
    },
  );

  return finalResult;
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Franchise.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        franchise_seq: OBJECT_param.franchise_seq,
        franchise_name: OBJECT_param.franchise_name,
        franchise_address_main: OBJECT_param.franchise_address_main,
        franchise_address_detail: OBJECT_param.franchise_address_detail,
        franchise_phone: OBJECT_param.franchise_phone,
        franchise_images: OBJECT_param.franchise_images,
        franchise_updateDt: newDate,
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
  const finalResult = await Franchise.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};