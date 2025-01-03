// contactRepository.ts

import mongoose from "mongoose";
import { Contact } from "@schemas/Contact";

// 0. cnt ------------------------------------------------------------------------------------------
export const cnt = async (
  contact_name_param: string,
  contact_phone_param: string,
) => {
  const finalResult = await Contact.countDocuments(
    {
      contact_name: contact_name_param,
      contact_phone: contact_phone_param,
    }
  );

  return finalResult;
};

// 1-1. find ---------------------------------------------------------------------------------------
export const find = async (
  contact_name_param: string,
  contact_phone_param: string,
) => {
  const finalResult = await Contact.aggregate([
    {
      $match: {
        contact_name: contact_name_param,
        contact_phone: contact_phone_param,
      }
    },
    {
      $project: {
        _id: 1,
        contact_number: 1,
        contact_category: 1,
        contact_name: 1,
        contact_email: 1,
        contact_phone: 1,
        contact_title: 1,
        contact_content: 1,
        contact_images: 1,
        contact_regDt: 1,
        contact_updateDt: 1,
      }
    }
  ]);

  return finalResult;
}

// 1-2. list ---------------------------------------------------------------------------------------
export const list = async (
  contact_name_param: string,
  contact_phone_param: string,
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Contact.aggregate([
    {
      $match: {
        contact_name: contact_name_param,
        contact_phone: contact_phone_param,
      }
    },
    {
      $project: {
        _id: 1,
        contact_number: 1,
        contact_category: 1,
        contact_name: 1,
        contact_email: 1,
        contact_phone: 1,
        contact_title: 1,
        contact_content: 1,
        contact_images: 1,
        contact_regDt: 1,
        contact_updateDt: 1,
      }
    },
    {
      $sort: {
        contact_number: sort_param
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
  const finalResult:any = await Contact.findOne(
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
  const finalResult = await Contact.create(
    {
      _id: new mongoose.Types.ObjectId(),
      contact_category: OBJECT_param.contact_category,
      contact_name: OBJECT_param.contact_name,
      contact_email: OBJECT_param.contact_email,
      contact_phone: OBJECT_param.contact_phone,
      contact_title: OBJECT_param.contact_title,
      contact_content: OBJECT_param.contact_content,
      contact_images: OBJECT_param.contact_images,
      contact_regDt: new Date(),
      contact_updateDt: null,
    },
  );

  return finalResult;
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Contact.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        contact_category: OBJECT_param.contact_category,
        contact_name: OBJECT_param.contact_name,
        contact_email: OBJECT_param.contact_email,
        contact_phone: OBJECT_param.contact_phone,
        contact_title: OBJECT_param.contact_title,
        contact_content: OBJECT_param.contact_content,
        contact_images: OBJECT_param.contact_images,
        contact_updateDt: new Date(),
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
  const finalResult = await Contact.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};
