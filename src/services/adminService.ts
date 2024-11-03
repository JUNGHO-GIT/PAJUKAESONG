// adminService.ts

import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import * as repository from "@repositories/adminRepository";
dotenv.config();

// 0. appInfo --------------------------------------------------------------------------------------
export const appInfo = async () => {

  let finalResult:any = null;
  let statusResult:string = "";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const markdownData = fs.readFileSync(path.join(__dirname, '../../changelog.md'), 'utf8');

  const dateRegex = /-\s*(\d{4}-\d{2}-\d{2})\s*\((\d{2}:\d{2}:\d{2})\)/g;
  const dateMatches = [...markdownData.matchAll(dateRegex)];

  const lastDateMatch = dateMatches.length > 0 ? dateMatches[dateMatches.length - 1] : null;
  const lastDateTime = lastDateMatch ? `${lastDateMatch[1]}_${lastDateMatch[2]}` : "";

  finalResult = {
    date: lastDateTime,
  };

  if (!finalResult) {
    statusResult = "fail"
    finalResult = null;
  }
  else {
    statusResult = "success";
    finalResult = finalResult;
  }

  return {
    status: statusResult,
    result: finalResult
  };
};

// 1-0. visit (count) ------------------------------------------------------------------------------
export const visitCount = async (
  DATE_param: string,
) => {

  // result 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  findResult = await repository.visitCount(
    DATE_param
  );

  if (!findResult) {
    statusResult = "fail";
    finalResult = null;
  }
  else {
    statusResult = "success";
    finalResult = {
      admin_visit_count: findResult?.[0]?.adminSection.length,
      admin_date: findResult?.[0]?.admin_date,
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
  DATE_param: string,
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
  ipResult = ipResult === "::1" ? "127.0.0.1" : ipResult;

  findResult = await repository.visitDetail(
    ipResult, DATE_param
  );

  if (!findResult) {
    createResult = await repository.visitSave(
      ipResult, DATE_param
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

// 2-1. contact (list) -----------------------------------------------------------------------------
export const contactList = async (
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

  totalCntResult = await repository.contactCount();

  findResult = await repository.contactList(
    sort, page
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

// 3-1. order (list) -------------------------------------------------------------------------------
export const orderList = async (
  DATE_param: string,
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
    DATE_param
  );

  findResult = await repository.orderList(
    DATE_param, sort, page
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