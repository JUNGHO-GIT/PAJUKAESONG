// useValidateUser.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateUser = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { PATH } = useCommonValue();

  // 2-2. useState ---------------------------------------------------------------------------------
  const REFS = useRef<any[]>([]);
  const [ERRORS, setERRORS] = useState<any[]>([]);
  const validate = useRef<Function>(() => {});

  // alert 표시 및 focus ---------------------------------------------------------------------------
  const showAlertAndFocus = (field: string, msg: string, idx: number) => {
    alert(msg);
    setTimeout(() => {
      REFS?.current?.[idx]?.[field]?.current?.focus();
    }, 10);
    setERRORS((prev) => {
      const updatedErrors = [...prev];
      updatedErrors[idx] = {
        ...updatedErrors[idx],
        [field]: true,
      };
      return updatedErrors;
    });
    return false;
  };

  // 이메일 형식 -----------------------------------------------------------------------------------
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // 8자 이상, 문자, 숫자, 특수문자 포함 -----------------------------------------------------------
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    validate.current = (OBJECT: any) => {
      try {
        // 1. login
        if (PATH.includes("/user/login")) {
          const target = [
            "user_id",
            "user_pw",
          ];
          REFS.current = (
            Array.from({ length: 1 }, (_, _idx) => (
              target.reduce((acc, cur) => ({
                ...acc,
                [cur]: createRef()
              }), {})
            ))
          );
          setERRORS (
            Array.from({ length: 1 }, (_, _idx) => (
              target.reduce((acc, cur) => ({
                ...acc,
                [cur]: false
              }), {})
            ))
          );
          if (!OBJECT?.user_id) {
            return showAlertAndFocus('user_id', "아이디를 입력해주세요.", 0);
          }
          else if (!OBJECT?.user_pw) {
            return showAlertAndFocus('user_pw', "비밀번호를 입력해주세요.", 0);
          }
          return true;
        }
        // 2. signup
        else if (PATH.includes("/user/signup")) {
          const target = [
            "user_id",
            "user_pw",
            /* "user_pw_confirm",
            "user_name",
            "user_email",
            "user_phone",
            "user_address", */
          ];
          REFS.current = (
            Array.from({ length: 1 }, (_, _idx) => (
              target.reduce((acc, cur) => ({
                ...acc,
                [cur]: createRef()
              }), {})
            ))
          );
          setERRORS (
            Array.from({ length: 1 }, (_, _idx) => (
              target.reduce((acc, cur) => ({
                ...acc,
                [cur]: false
              }), {})
            ))
          );
          if (!OBJECT?.user_id) {
            return showAlertAndFocus('user_id', "아이디를 입력해주세요.", 0);
          }
          else if (!OBJECT?.user_pw) {
            return showAlertAndFocus('user_pw', "비밀번호를 입력해주세요.", 0);
          }
          /* else if (!OBJECT?.user_pw_confirm) {
            return showAlertAndFocus('user_pw_confirm', "비밀번호 확인을 입력해주세요.", 0);
          }
          else if (OBJECT?.user_pw !== OBJECT?.user_pw_confirm) {
            return showAlertAndFocus('user_pw_confirm', "비밀번호가 일치하지 않습니다.", 0);
          }
          else if (!OBJECT?.user_name) {
            return showAlertAndFocus('user_name', "이름을 입력해주세요.", 0);
          }
          else if (!OBJECT?.user_email) {
            return showAlertAndFocus('user_email', "이메일을 입력해주세요.", 0);
          }
          else if (!OBJECT?.user_phone) {
            return showAlertAndFocus('user_phone', "전화번호를 입력해주세요.", 0);
          }
          else if (!OBJECT?.user_address) {
            return showAlertAndFocus('user_address', "주소를 입력해주세요.", 0);
          } */
          return true;
        }
      }
      catch (err: any) {
        console.error(err);
      }
    }
  }, [PATH]);

  // 10. return ------------------------------------------------------------------------------------
  return {
    ERRORS: ERRORS,
    REFS: REFS.current,
    validate: validate.current,
  };
};