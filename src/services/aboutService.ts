// aboutService.ts

import * as repository from "@repositories/aboutRepository";

// 1-2. greeting -----------------------------------------------------------------------------------
export const greeting = async (
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.greeting(
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

// 2-2. introduce ----------------------------------------------------------------------------------
export const introduce = async (
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.introduce(
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

// 3-2. location -----------------------------------------------------------------------------------
export const location = async (
) => {

  // findResult, finalResult 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "";

  findResult = await repository.location(
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