// franchiseService.ts

import * as repository from "@repositories/franchiseRepository";

// 1-1. listBranch ---------------------------------------------------------------------------------
export const listBranch = async (
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

  totalCntResult = await repository.cntBranch(
  );

  findResult = await repository.listBranch(
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

// 1-2. listInquiry --------------------------------------------------------------------------------
export const listInquiry = async (
  franchise_inquiry_name_param: string,
  franchise_inquiry_email_param: string,
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

  totalCntResult = await repository.cntInquiry(
    franchise_inquiry_name_param, franchise_inquiry_email_param
  );

  findResult = await repository.listInquiry(
    franchise_inquiry_name_param, franchise_inquiry_email_param, sort, page
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

// 1-2. detailBranch -------------------------------------------------------------------------------
export const detailBranch = async (
  _id_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.detailBranch(
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

// 2-1. detailInquiry ------------------------------------------------------------------------------
export const detailInquiry = async (
  _id_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.detailInquiry(
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

// 3-1. saveBranch ---------------------------------------------------------------------------------
export const saveBranch = async (
  OBJECT_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.saveBranch(
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

// 3-2. saveInquiry -------------------------------------------------------------------------------
export const saveInquiry = async (
  OBJECT_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.saveInquiry(
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

// 4-1. updateBranch ------------------------------------------------------------------------------
export const updateBranch = async (
  _id_param: string,
  OBJECT_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.updateBranch(
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

// 4-2. updateInquiry -----------------------------------------------------------------------------
export const updateInquiry = async (
  _id_param: string,
  OBJECT_param: any,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.updateInquiry(
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

// 5-1. deletesBranch ------------------------------------------------------------------------------
export const deletesBranch = async (
  _id_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.deletesBranch(
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

// 5-2. deletesInquiry -----------------------------------------------------------------------------
export const deletesInquiry = async (
  _id_param: string,
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.deletesInquiry(
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