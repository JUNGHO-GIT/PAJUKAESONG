// contactService.ts

import * as repository from "@repositories/contactRepository";

// 0. find -----------------------------------------------------------------------------------------
export const find = async (
  contact_name_param: string,
  contact_email_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.find(
    contact_name_param, contact_email_param
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

// 1. list -----------------------------------------------------------------------------------------
// page는 무조건 0부터 시작
export const list = async (
  contact_name_param: string,
  contact_email_param: string,
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
    contact_name_param, contact_email_param
  );

  findResult = await repository.list(
    contact_name_param, contact_email_param, sort, page
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