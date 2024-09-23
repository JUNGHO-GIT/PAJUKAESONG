// orderService.ts

import * as repository from "@repositories/orderRepository";

// 1. list -----------------------------------------------------------------------------------------
// page는 무조건 0부터 시작
// 빈값은 [] 리턴
export const list = async (
  order_name_param: string,
  order_phone_param: string,
  PAGING_param: any,
) => {

  // result 변수 선언
  let findResult: any = null;
  let finalResult: any[] = [];
  let statusResult: string = "fail";
  let totalCntResult: any = null;

  // sort, page 변수 선언
  const sort = PAGING_param.sort === "asc" ? 1 : -1;
  const page = PAGING_param.page || 0;

  totalCntResult = await repository.cnt(
    order_name_param, order_phone_param
  );

  findResult = await repository.list(
    order_name_param, order_phone_param, sort, page
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

// 2-1. find ---------------------------------------------------------------------------------------
export const find = async (
  order_name_param: string,
  order_phone_param: string,
) => {

  // result 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  findResult = await repository.find(
    order_name_param, order_phone_param
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

// 2-2. detail -------------------------------------------------------------------------------------
export const detail = async (
  _id_param: string,
) => {

  // result 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

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

  // result 변수 선언
  let saveResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  saveResult = await repository.save(
    OBJECT_param
  );

  if (!saveResult) {
    statusResult = "fail";
    finalResult = null;
  }
  else {
    statusResult = "success";
    finalResult = saveResult;
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

  // result 변수 선언
  let updateResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  updateResult = await repository.update(
    _id_param, OBJECT_param
  );

  if (!updateResult) {
    statusResult = "fail";
    finalResult = null;
  }
  else {
    statusResult = "success";
    finalResult = updateResult;
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};

// 5. delete ---------------------------------------------------------------------------------------
export const deletes = async (
  _id_param: string,
) => {

  // result 변수 선언
  let deleteResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  deleteResult = await repository.deletes(
    _id_param
  );

  if (!deleteResult) {
    statusResult = "fail";
    finalResult = null;
  }
  else {
    statusResult = "success";
    finalResult = deleteResult;
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};