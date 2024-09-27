// adminService.ts

import * as repository from "@repositories/adminRepository";

// 1-0. visit (count) ------------------------------------------------------------------------------
export const visitCount = async (
  date_param: string,
) => {

  // result 변수 선언
  let cntResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  cntResult = await repository.visitCount(
    date_param
  );

  if (!cntResult) {
    statusResult = "fail";
    finalResult = null;
  }
  else {
    statusResult = "success";
    finalResult = {
      admin_visit_count: cntResult,
      admin_date: date_param,
    };
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};

// 1-3. visit (save) -------------------------------------------------------------------------------
export const visitSave = async (
  req_param: any,
  date_param: string,
) => {

  // result 변수 선언
  let headerResult: any = null;
  let ipResult: any = null;
  let findResult: any = null;
  let createResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  headerResult = req_param.headers['x-forwarded-for'];
  ipResult = headerResult ? headerResult.split(',')[0] : req_param.connection.remoteAddress;
  ipResult === "::1" ? ipResult = "127.0.0.1" : ipResult;

  findResult = await repository.visitDetail(
    ipResult, date_param
  );

  if (!findResult) {
    createResult = await repository.visitSave(
      ipResult, date_param
    );

    if (!createResult) {
      statusResult = "fail";
      finalResult = null;
    }
    else {
      statusResult = "success";
      finalResult = createResult;
    }
  }
  else {
    statusResult = "success";
    finalResult = findResult;
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};

// 2-1. order (list) -------------------------------------------------------------------------------
export const orderList = async (
  date_param: string,
  PAGING_param: any,
) => {

  // result 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";
  let totalCntResult: any = null;

  // sort, page 변수 선언
  const sort = PAGING_param.sort === "asc" ? 1 : -1;
  const page = PAGING_param.page || 0;

  totalCntResult = await repository.orderCount(
    date_param
  );

  findResult = await repository.orderList(
    date_param, sort, page
  );

  if (!findResult || findResult.length <= 0) {
    statusResult = "fail";
    finalResult = [];
  }
  else {
    statusResult = "success";
    finalResult = findResult;
  }

  return {
    status: statusResult,
    totalCnt: totalCntResult,
    result: finalResult,
  };
};