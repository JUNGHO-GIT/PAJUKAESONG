// useValidateUser.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommon } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateUser = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    PATH,
  } = useCommon();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [ERRORS, setERRORS] = useState<any>({});
  const REFS = useRef<any>({});
  const validate = useRef<any>(() => {});
  let returnValid = false;

  // 에러 메시지 출력 및 포커스
  const showAlertAndFocus = (field: string, msg: string) => {
    alert(msg);
    REFS.current[field].current.focus();
    setERRORS({
      [field]: true,
    });
    return returnValid;
  };

  // 이메일 형식
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // 8자 이상, 문자, 숫자, 특수문자 포함
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    try {
      // 1. save
      if (PATH.includes("/user/login")) {
        const target = [
          "user_id",
          "user_pw",
        ];
        setERRORS(
          target.reduce((acc: any, cur: string) => {
            acc[cur] = false;
            return acc;
          }, {})
        );
        REFS.current = (
          target.reduce((acc: any, cur: string) => {
            acc[cur] = createRef();
            return acc;
          }, {})
        );
        validate.current = (OBJECT: any) => {
          if (!OBJECT.user_id) {
            return showAlertAndFocus('user_id', "아이디를 입력해주세요.");
          }
          else if (!OBJECT.user_pw) {
            return showAlertAndFocus('user_pw', "비밀번호를 입력해주세요.");
          }
          return !returnValid;
        }
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
        setERRORS(
          target.reduce((acc: any, cur: string) => {
            acc[cur] = false;
            return acc;
          }, {})
        );
        REFS.current = (
          target.reduce((acc: any, cur: string) => {
            acc[cur] = createRef();
            return acc;
          }, {})
        );
        validate.current = (OBJECT: any) => {
          if (!OBJECT.user_id) {
            return showAlertAndFocus('user_id', "아이디를 입력해주세요.");
          }
          else if (!OBJECT.user_pw) {
            return showAlertAndFocus('user_pw', "비밀번호를 입력해주세요.");
          }
          /* else if (!OBJECT.user_pw_confirm) {
            return showAlertAndFocus('user_pw_confirm', "비밀번호 확인을 입력해주세요.");
          }
          else if (OBJECT.user_pw !== OBJECT.user_pw_confirm) {
            return showAlertAndFocus('user_pw_confirm', "비밀번호가 일치하지 않습니다.");
          }
          else if (!OBJECT.user_name) {
            return showAlertAndFocus('user_name', "이름을 입력해주세요.");
          }
          else if (!OBJECT.user_email) {
            return showAlertAndFocus('user_email', "이메일을 입력해주세요.");
          }
          else if (!OBJECT.user_phone) {
            return showAlertAndFocus('user_phone', "전화번호를 입력해주세요.");
          }
          else if (!OBJECT.user_address) {
            return showAlertAndFocus('user_address', "주소를 입력해주세요.");
          } */
          return !returnValid;
        }
      }
    }
    catch (err: any) {
      console.error(err);
    }
  }, [PATH]);

  // 10. return ------------------------------------------------------------------------------------
  return {
    ERRORS,
    REFS,
    validate: validate.current,
  };
};
