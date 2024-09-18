// useValidateContact.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateContact = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    PATH,
  } = useCommonValue();

  // 2-2. useState ---------------------------------------------------------------------------------
  const REFS: any = useRef<any>({});
  const [ERRORS, setERRORS] = useState<any>({});
  const validate = useRef<any>(() => {});

  // alert 표시 및 focus ---------------------------------------------------------------------------
  const showAlertAndFocus = (field: string, msg: string, idx: number) => {
    alert(msg);
    REFS.current?.[idx]?.[field]?.current?.focus();
    setERRORS({
      [idx]: {
        [field]: true,
      },
    });
    return false;
  };

  // 이메일 형식 -----------------------------------------------------------------------------------
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
        setERRORS(target.reduce((acc: any[], cur: string) => {
          acc.push({
            [cur]: false
          });
          return acc;
        }, []));
        REFS.current = (target.reduce((acc: any[], cur: string) => {
          acc.push({
            [cur]: createRef()
          });
          return acc;
        }, []));
        validate.current = (OBJECT: any) => {
          if (!OBJECT.contact_name) {
            return showAlertAndFocus('contact_name', "이름을 입력해주세요.", 0);
          }
          else if (!OBJECT.contact_email) {
            return showAlertAndFocus('contact_email', "이메일을 입력해주세요.", 0);
          }
          else if (!validateEmail(OBJECT.contact_email)) {
            return showAlertAndFocus('contact_email', "이메일 형식으로 입력해주세요.", 0);
          }
          else {
            return true;
          }
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
        setERRORS(target.reduce((acc: any[], cur: string) => {
          acc.push({
            [cur]: false
          });
          return acc;
        }, []));
        REFS.current = (target.reduce((acc: any[], cur: string) => {
          acc.push({
            [cur]: createRef()
          });
          return acc;
        }, []));
        validate.current = (OBJECT: any) => {
          if (!OBJECT.contact_category) {
            return showAlertAndFocus('contact_category', "문의 유형을 선택해주세요.", 0);
          }
          else if (!OBJECT.contact_name) {
            return showAlertAndFocus('contact_name', "이름을 입력해주세요.", 0);
          }
          else if (!OBJECT.contact_email) {
            return showAlertAndFocus('contact_email', "이메일을 입력해주세요.", 0);
          }
          else if (!validateEmail(OBJECT.contact_email)) {
            return showAlertAndFocus('contact_email', "이메일 형식으로 입력해주세요.", 0);
          }
          else if (!OBJECT.contact_phone) {
            return showAlertAndFocus('contact_phone', "전화번호를 입력해주세요.", 0);
          }
          else if (!OBJECT.contact_title) {
            return showAlertAndFocus('contact_title', "제목을 입력해주세요.", 0);
          }
          else if (!OBJECT.contact_content) {
            return showAlertAndFocus('contact_content', "내용을 입력해주세요.", 0);
          }
          else {
            return true;
          }
        }
      }
    }
    catch (err: any) {
      console.error(err);
    }
  }, [PATH]);

  // 10. return ------------------------------------------------------------------------------------
  return {
    ERRORS: ERRORS,
    REFS: REFS.current,
    validate: validate.current,
  };
};