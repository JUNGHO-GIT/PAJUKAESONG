// useValidateContact.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommon } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateContact = () => {

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

      // 1. find
      if (PATH.includes("/contact/find")) {
        const target = [
          "contact_name",
          "contact_email",
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
          if (!OBJECT.contact_name) {
            return showAlertAndFocus('contact_name', "이름을 입력해주세요.");
          }
          else if (!OBJECT.contact_email) {
            return showAlertAndFocus('contact_email', "이메일을 입력해주세요.");
          }
          else if (!validateEmail(OBJECT.contact_email)) {
            return showAlertAndFocus('contact_email', "이메일 형식으로 입력해주세요.");
          }
          return !returnValid;
        }
      }

      // 2. save
      if (PATH.includes("/contact/save")) {
        const target = [
          "contact_category",
          "contact_name",
          "contact_email",
          "contact_phone",
          "contact_title",
          "contact_content",
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
          if (!OBJECT.contact_category) {
            return showAlertAndFocus('contact_category', "문의 유형을 선택해주세요.");
          }
          else if (!OBJECT.contact_name) {
            return showAlertAndFocus('contact_name', "이름을 입력해주세요.");
          }
          else if (!OBJECT.contact_email) {
            return showAlertAndFocus('contact_email', "이메일을 입력해주세요.");
          }
          else if (!validateEmail(OBJECT.contact_email)) {
            return showAlertAndFocus('contact_email', "이메일 형식으로 입력해주세요.");
          }
          else if (!OBJECT.contact_phone) {
            return showAlertAndFocus('contact_phone', "전화번호를 입력해주세요.");
          }
          else if (!OBJECT.contact_title) {
            return showAlertAndFocus('contact_title', "제목을 입력해주세요.");
          }
          else if (!OBJECT.contact_content) {
            return showAlertAndFocus('contact_content', "내용을 입력해주세요.");
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
