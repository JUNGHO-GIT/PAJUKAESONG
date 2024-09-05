// noticeService.ts

import * as repository from "@repositories/notice/noticeRepository";

// 1. list -----------------------------------------------------------------------------------------
export const list = async (
  user_id_param: string,
  PAGING_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";
  let totalCntResult: any = null;

  // sort, page 변수 선언
  const sort = PAGING_param.sort === "asc" ? 1 : -1;
  const page = PAGING_param.page === 0 ? 1 : PAGING_param.page;

  totalCntResult = await repository.cnt(
  );

  findResult = await repository.list(
    sort, page
  );

  if (findResult) {
    statusResult = "success";
    finalResult = findResult;
  }
  else {
    statusResult = "fail";
    finalResult = null;
  }

  return {
    status: statusResult,
    totalCnt: totalCntResult,
    result: finalResult,
  };
};

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async (
  user_id_param: string,
  _id_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.detail(
    _id_param
  );

  if (findResult) {
    statusResult = "success";
    finalResult = findResult;
  }
  else {
    statusResult = "fail";
    finalResult = null;
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};

// 3. save -----------------------------------------------------------------------------------------
export const save = async (
  user_id_param: string,
  OBJECT_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.save(
    OBJECT_param
  );

  if (findResult) {
    statusResult = "success";
    finalResult = findResult;
  }
  else {
    statusResult = "fail";
    finalResult = null;
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  user_id_param: string,
  _id_param: string,
  OBJECT_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.update(
    _id_param, OBJECT_param
  );

  if (findResult) {
    statusResult = "success";
    finalResult = findResult;
  }
  else {
    statusResult = "fail";
    finalResult = null;
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};

// 5. deletes --------------------------------------------------------------------------------------
export const deletes = async (
  user_id_param: string,
  _id_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.deletes(
    _id_param
  );

  if (findResult) {
    statusResult = "success";
    finalResult = findResult;
  }
  else {
    statusResult = "fail";
    finalResult = null;
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};