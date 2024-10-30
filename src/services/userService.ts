// userService.ts

import * as repository from "@repositories/userRepository";
import { token, adminCheck, combinePw, hashPw, comparePw } from "@assets/scripts/utils";

// 2-1. login --------------------------------------------------------------------------------------
export const login = async (
  user_id_param: string,
  user_pw_param: string,
) => {

  // result 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let loginResult: any = null;
  let adminResult: any = null;
  let statusResult: string = "fail";

  findResult = await repository.checkId(
    user_id_param
  );

  if (!findResult) {
    statusResult = "notExist";
    finalResult = null;
  }
  else {
    const combinedPw = await combinePw(
      user_pw_param, findResult.user_token
    );
    loginResult = await comparePw(
      combinedPw, findResult.user_pw
    );

    if (!loginResult) {
      statusResult = "fail";
      finalResult = null;
    }
    else {
      statusResult = "success";
      finalResult = findResult;
    }

    if (adminCheck(findResult.user_id)) {
      adminResult = "admin";
    }
    else {
      adminResult = "user";
    }
  }

  return {
    status: statusResult,
    result: finalResult,
    admin: adminResult,
  };
};

// 2-2. signup -------------------------------------------------------------------------------------
export const signup = async (
  OBJECT_param: any,
) => {

  // result 변수 선언
  let findResult: any = null;
  let finalResult: any = null;
  let statusResult: string = "fail";

  findResult = await repository.checkId(
    OBJECT_param.user_id
  );

  if (findResult) {
    statusResult = "alreadyExist";
    finalResult = null;
  }
  else {
    const combinedPw = await combinePw(
      OBJECT_param.user_pw, token
    );
    const hashedPw = await hashPw(
      combinedPw
    );
    OBJECT_param.user_token = token;
    OBJECT_param.user_pw = hashedPw;

    statusResult = "success";
    finalResult = await repository.save(
      OBJECT_param
    );
  }

  return {
    status: statusResult,
    result: finalResult,
  };
};