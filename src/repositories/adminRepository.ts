// adminRepository.ts

import { Admin } from "@schemas/Admin";
import { Order } from "@schemas/Order";
import { newDate } from "@scripts/date";

// 1-0. visit (count) ------------------------------------------------------------------------------
export const visitCount = async (
  DATE_param: string,
) => {
  const finalResult = await Admin.aggregate([
    {
      $match: {
        admin_date: DATE_param
      }
    },
    {
      $project: {
        _id: 1,
        admin_date: 1,
        adminSection: 1,
      }
    }
  ]);

  return finalResult;
};

// 1-2. visit (detail) -----------------------------------------------------------------------------
export const visitDetail = async (
  ip_param: string,
  DATE_param: string,
) => {

  const finalResult:any = await Admin.findOne(
    {
      admin_date: DATE_param,
      "adminSection.admin_visit_ip": ip_param
    }
  );

  return finalResult;
};

// 1-3. visit (save) -------------------------------------------------------------------------------
export const visitSave = async (
  ip_param: string,
  DATE_param: string,
) => {

  const finalResult:any = await Admin.create(
    {
      admin_date: DATE_param,
      adminSection: [
        {
          admin_visit_ip: ip_param
        }
      ],
      admin_regDt: newDate,
      admin_updateDt: null
    }
  );

  return finalResult;
};

// 2-0. order (count) ------------------------------------------------------------------------------
export const orderCount = async (
  DATE_param: string,
) => {
  const finalResult = await Order.countDocuments(
    {
      order_date: DATE_param
    }
  );

  return finalResult;
};

// 2-1. order (list) -------------------------------------------------------------------------------
export const orderList = async (
  DATE_param: string,
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult:any = await Order.aggregate([
    {
      $match: {
        order_date: DATE_param
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
