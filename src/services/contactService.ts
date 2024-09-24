// contactService.ts

import * as repository from "@repositories/contactRepository";
import { uploadCloud } from "@scripts/upload";

const title = "contact";

// 1. list -----------------------------------------------------------------------------------------
export const list = async (
  contact_name_param: string,
  contact_phone_param: string,
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
    contact_name_param, contact_phone_param
  );

  findResult = await repository.list(
    contact_name_param, contact_phone_param, sort, page
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
  contact_name_param: string,
  contact_phone_param: string,
) => {

  // result 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  findResult = await repository.find(
    contact_name_param, contact_phone_param
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
  fileList_param: any,
) => {

  // result 변수 선언
  let saveResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  const mergedImages = (
    JSON.parse(OBJECT_param[`${title}_images`]).concat(fileList_param.map((file: any) => (
      file.originalname
    )))
  );
  OBJECT_param[`${title}_images`] = mergedImages;

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

    // 클라우드에 이미지 업로드
    uploadCloud(title, fileList_param);
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
  fileList_param: any,
) => {

  // result 변수 선언
  let updateResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  const mergedImages = (
    JSON.parse(OBJECT_param[`${title}_images`]).concat(fileList_param.map((file: any) => (
      file.originalname
    )))
  );
  OBJECT_param[`${title}_images`] = mergedImages;

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

    // 클라우드에 이미지 업로드
    uploadCloud(title, fileList_param);
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