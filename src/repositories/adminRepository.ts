// adminRepository.ts

import { Admin } from "@schemas/Admin";
import { Order } from "@schemas/Order";
import { Contact } from "@schemas/Contact";

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
      admin_regDt: new Date(),
      admin_updateDt: null
    }
  );

  return finalResult;
};

// 2-0. contact (count) ----------------------------------------------------------------------------
export const contactCount = async (
) => {
  const finalResult = await Contact.countDocuments();

  return finalResult;
};

// 2-1. contact (list) -----------------------------------------------------------------------------
export const contactList = async (
  sort_param: 1 | -1,
  page_param: number,
) => {
  const finalResult:any = await Contact.aggregate([
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

// 3-0. order (count) ------------------------------------------------------------------------------
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

// 3-1. order (list) -------------------------------------------------------------------------------
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
