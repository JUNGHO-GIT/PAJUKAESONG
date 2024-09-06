// useValidateFranchise.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommon } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateFranchise = () => {

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

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    try {
      // 1. inquiry
      if (PATH.includes("/franchise/inquiry")) {
        const target = [
          "franchise_inquiry_name",
          "franchise_inquiry_email",
          "franchise_inquiry_phone",
          "franchise_inquiry_title",
          "franchise_inquiry_content",
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
          if (!OBJECT.franchise_inquiry_name) {
            return showAlertAndFocus('franchise_inquiry_name', "이름을 입력해주세요.");
          }
          else if (!OBJECT.franchise_inquiry_email) {
            return showAlertAndFocus('franchise_inquiry_email', "이메일을 입력해주세요.");
          }
          else if (!validateEmail(OBJECT.franchise_inquiry_email)) {
            return showAlertAndFocus('franchise_inquiry_email', "이메일 형식으로 입력해주세요.");
          }
          else if (!OBJECT.franchise_inquiry_phone) {
            return showAlertAndFocus('franchise_inquiry_phone', "전화번호를 입력해주세요.");
          }
          else if (!OBJECT.franchise_inquiry_title) {
            return showAlertAndFocus('franchise_inquiry_title', "제목을 입력해주세요.");
          }
          else if (!OBJECT.franchise_inquiry_content) {
            return showAlertAndFocus('franchise_inquiry_content', "내용을 입력해주세요.");
          }
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
