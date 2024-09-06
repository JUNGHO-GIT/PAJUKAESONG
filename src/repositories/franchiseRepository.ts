// franchiseRepository.ts

import mongoose from "mongoose";
import { Franchise } from "@schemas/Franchise";
import { newDate } from "@scripts/date";

// 1-0. cntBranch ----------------------------------------------------------------------------------
export const cntBranch = async (

) => {
  const finalResult = await Franchise.countDocuments(
    {
      franchise_branch_name: { $ne: null }
    }
  );

  return finalResult;
};

// 1-0. cntInquiry ---------------------------------------------------------------------------------
export const cntInquiry = async (
  franchise_inquiry_name_param: string,
  franchise_inquiry_email_param: string,
) => {
  const finalResult = await Franchise.countDocuments(
    {
      franchise_inquiry_name: franchise_inquiry_name_param,
      franchise_inquiry_email: franchise_inquiry_email_param,
    }
  );

  return finalResult;
};

// 1-1. listBranch ---------------------------------------------------------------------------------
export const listBranch = async (
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Franchise.aggregate([
    {
      $match: {
        franchise_branch_name: { $ne: null }
      }
    },
    {
      $project: {
        _id: 1,
        franchise_branch_number: 1,
        franchise_branch_name: 1,
        franchise_branch_email: 1,
        franchise_branch_phone: 1,
        franchise_branch_regDt: 1,
        franchise_branch_updateDt: 1,
      }
    },
    {
      $sort: {
        franchise_branch_number: sort_param
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

// 1-2. listInquiry --------------------------------------------------------------------------------
export const listInquiry = async (
  franchise_inquiry_name_param: string,
  franchise_inquiry_email_param: string,
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult = await Franchise.aggregate([
    {
      $match: {
        franchise_inquiry_name: franchise_inquiry_name_param,
        franchise_inquiry_email: franchise_inquiry_email_param,
      }
    },
    {
      $project: {
        _id: 1,
        franchise_inquiry_number: 1,
        franchise_inquiry_name: 1,
        franchise_inquiry_email: 1,
        franchise_inquiry_phone: 1,
        franchise_inquiry_title: 1,
        franchise_inquiry_content: 1,
        franchise_inquiry_regDt: 1,
        franchise_inquiry_updateDt: 1,
      }
    },
    {
      $sort: {
        franchise_inquiry_number: sort_param
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

// 2-1. detailBranch -------------------------------------------------------------------------------
export const detailBranch = async (
  _id_param: string,
) => {
  const finalResult:any = await Franchise.findOne(
    {
      _id: _id_param
    }
  )
  .lean();

  return finalResult;
}

// 2-2. detailInquiry ------------------------------------------------------------------------------
export const detailInquiry = async (
  _id_param: string,
) => {
  const finalResult:any = await Franchise.findOne(
    {
      _id: _id_param
    }
  )
  .lean();

  return finalResult;
}

// 3-1. saveBranch ---------------------------------------------------------------------------------
export const saveBranch = async (
  OBJECT_param: any,
) => {
  const finalResult = await Franchise.create(
    {
      _id: new mongoose.Types.ObjectId(),
      franchise_branch_name: OBJECT_param.franchise_branch_name,
      franchise_branch_address: OBJECT_param.franchise_branch_address,
      franchise_branch_phone: OBJECT_param.franchise_branch_phone,
      franchise_branch_image: OBJECT_param.franchise_branch_image,
      franchise_branch_regDt: newDate,
      franchise_branch_updateDt: null,
    },
  );

  return finalResult;
};

// 3-2. saveInquiry -------------------------------------------------------------------------------
export const saveInquiry = async (
  OBJECT_param: any,
) => {
  const finalResult = await Franchise.create(
    {
      _id: new mongoose.Types.ObjectId(),
      franchise_inquiry_name: OBJECT_param.franchise_inquiry_name,
      franchise_inquiry_email: OBJECT_param.franchise_inquiry_email,
      franchise_inquiry_phone: OBJECT_param.franchise_inquiry_phone,
      franchise_inquiry_title: OBJECT_param.franchise_inquiry_title,
      franchise_inquiry_content: OBJECT_param.franchise_inquiry_content,
      franchise_inquiry_regDt: newDate,
      franchise_inquiry_updateDt: null,
    },
  );

  return finalResult;
};

// 4-1. updateBranch -------------------------------------------------------------------------------
export const updateBranch = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Franchise.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        franchise_branch_name: OBJECT_param.franchise_branch_name,
        franchise_branch_address: OBJECT_param.franchise_branch_address,
        franchise_branch_phone: OBJECT_param.franchise_branch_phone,
        franchise_branch_image: OBJECT_param.franchise_branch_image,
        franchise_branch_updateDt: newDate,
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

// 4-2. updateInquiry ------------------------------------------------------------------------------
export const updateInquiry = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await Franchise.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        franchise_inquiry_name: OBJECT_param.franchise_inquiry_name,
        franchise_inquiry_email: OBJECT_param.franchise_inquiry_email,
        franchise_inquiry_phone: OBJECT_param.franchise_inquiry_phone,
        franchise_inquiry_title: OBJECT_param.franchise_inquiry_title,
        franchise_inquiry_content: OBJECT_param.franchise_inquiry_content,
        franchise_inquiry_updateDt: newDate,
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

// 5-1. deletesBranch ------------------------------------------------------------------------------
export const deletesBranch = async (
  _id_param: string,
) => {
  const finalResult = await Franchise.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};

// 5-2. deletesInquiry -----------------------------------------------------------------------------
export const deletesInquiry = async (
  _id_param: string,
) => {
  const finalResult = await Franchise.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};