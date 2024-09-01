// userService.ts

// 2-3. userLogin ----------------------------------------------------------------------------------
export const userLogin = async (
  user_id_param: string,
  user_pw_param: string,
) => {

  // findResult, finalResult 변수 선언
  let finalResult: any = null;
  let adminResult: any = null;

  const adminId = process.env.ADMIN_ID;
  const adminPw = process.env.ADMIN_PW;

  if (user_id_param === adminId && user_pw_param === adminPw) {
    finalResult = "success";
    adminResult = "admin";
  }
  else {
    finalResult = "fail";
    adminResult = "fail";
  }

  return {
    result: finalResult,
    admin: adminResult
  };
};