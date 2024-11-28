// Order.tsx

import { moment } from "@importLibs";

// -------------------------------------------------------------------------------------------------
export const Order = {

  _id: "",

  order_number: 1,
  order_category: "reservation",
  order_name: "",
  order_email: "",
  order_phone: "",
  order_date: moment().tz("Asia/Seoul").format("YYYY-MM-DD"),
  order_time: "11:00",
  order_headcount: "1",
  order_total_price: "",
  order_product: [
    {
      product_name: "",
      product_count: "",
      product_price: "1",
      product_images: [],
    }
  ],

  order_regDt: null,
  order_updateDt: null,
};