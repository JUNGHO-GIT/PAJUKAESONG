// franchiseService.ts

import * as repository from "@repositories/franchiseRepository";

// 1. list -----------------------------------------------------------------------------------------
// page는 무조건 0부터 시작
export const list = async (
  PAGING_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";
  let totalCntResult: any = null;

  // sort, page 변수 선언
  const sort = PAGING_param.sort === "asc" ? 1 : -1;
  const page = PAGING_param.page || 0;

  totalCntResult = await repository.cnt(
  );

  findResult = await repository.list(
    sort, page
  );

  if (!findResult || findResult.length <= 0) {
    statusResult = "fail";
    finalResult = null;
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

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async (
  _id_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.detail(
    _id_param
  );

  if (!findResult) {
    statusResult = "fail";
    finalResult = null;
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

// 3. save -----------------------------------------------------------------------------------------
export const save = async (
  OBJECT_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.save(
    OBJECT_param
  );

  if (!findResult) {
    statusResult = "fail";
    finalResult = null;
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

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
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

  if (!findResult) {
    statusResult = "fail";
    finalResult = null;
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

// 5. deletes --------------------------------------------------------------------------------------
export const deletes = async (
  _id_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.deletes(
    _id_param
  );

  if (!findResult) {
    statusResult = "fail";
    finalResult = null;
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