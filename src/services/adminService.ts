// adminService.ts

import * as repository from "@repositories/adminRepository";

// 0. visit ----------------------------------------------------------------------------------------
export const visit = async (
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

  findResult = await repository.detail(
    ipResult, date_param
  );

  if (!findResult) {
    createResult = await repository.save(
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

  console.log("ipResult: ", ipResult);
  console.log("date_param: ", date_param);
  console.log("findResult: ", findResult);
  console.log("createResult: ", createResult);
  console.log("finalResult: ", finalResult);

  return {
    status: statusResult,
    result: finalResult,
  };
};