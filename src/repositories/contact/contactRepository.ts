// contactInquiryRepository.ts

import mongoose from "mongoose";
import { Contact } from "@schemas/contact/Contact";
import { newDate } from "@scripts/date";

// 0. cnt ------------------------------------------------------------------------------------------
export const cnt = async (
  contact_name_param: string,
  contact_email_param: string,
) => {
  const finalResult = await Contact.countDocuments(
    {
      contact_name: contact_name_param,
      contact_email: contact_email_param,
    }
  );

  return finalResult;
};

// 0. find -----------------------------------------------------------------------------------------
export const find = async (
  contact_name_param: string,
  contact_email_param: string,
) => {
  const finalResult = await Contact.findOne(
    {
      contact_name: contact_name_param,
      contact_email: contact_email_param,
    }
  )
  .lean();

  return finalResult;
};

// 1. list -----------------------------------------------------------------------------------------
export const list = async (
  contact_name_param: string,
  contact_email_param: string,
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Contact.aggregate([
    {
      $match: {
        contact_name: contact_name_param,
        contact_email: contact_email_param,
      }
    },
    {
      $project: {
        _id: 1,
        contact_number: 1,
        contact_name: 1,
        contact_email: 1,
        contact_phone: 1,
        contact_title: 1,
        contact_content: 1,
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
      contact_name: OBJECT_param.contact_name,
      contact_email: OBJECT_param.contact_email,
      contact_phone: OBJECT_param.contact_phone,
      contact_title: OBJECT_param.contact_title,
      contact_content: OBJECT_param.contact_content,
      contact_regDt: newDate,
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
        contact_name: OBJECT_param.contact_name,
        contact_email: OBJECT_param.contact_email,
        contact_phone: OBJECT_param.contact_phone,
        contact_title: OBJECT_param.contact_title,
        contact_content: OBJECT_param.contact_content,
        contact_updateDt: newDate,
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
  const finalResult = await Contact.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};
