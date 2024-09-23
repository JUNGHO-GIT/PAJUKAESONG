// useValidateOrder.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateOrder = () => {

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

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    validate.current = (OBJECT: any) => {
      try {
        // 1. find
        if (PATH.includes("/order/find")) {
          const target = [
            "order_name",
            "order_email",
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
          if (!OBJECT.order_name) {
            return showAlertAndFocus('order_name', "이름을 입력해주세요.", 0);
          }
          else if (!OBJECT.order_email) {
            return showAlertAndFocus('order_email', "이메일을 입력해주세요.", 0);
          }
          else if (!validateEmail(OBJECT.order_email)) {
            return showAlertAndFocus('order_email', "이메일 형식으로 입력해주세요.", 0);
          }
          return true;
        }

        // 2. save
        if (PATH.includes("/order/save")) {
          const target = [
            "order_category",
            "order_name",
            "order_email",
            "order_phone",
            "order_title",
            "order_content",
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
          if (!OBJECT.order_category) {
            return showAlertAndFocus('order_category', "문의 유형을 선택해주세요.", 0);
          }
          else if (!OBJECT.order_name) {
            return showAlertAndFocus('order_name', "이름을 입력해주세요.", 0);
          }
          else if (!OBJECT.order_email) {
            return showAlertAndFocus('order_email', "이메일을 입력해주세요.", 0);
          }
          else if (!validateEmail(OBJECT.order_email)) {
            return showAlertAndFocus('order_email', "이메일 형식으로 입력해주세요.", 0);
          }
          else if (!OBJECT.order_phone) {
            return showAlertAndFocus('order_phone', "전화번호를 입력해주세요.", 0);
          }
          else if (!OBJECT.order_title) {
            return showAlertAndFocus('order_title', "제목을 입력해주세요.", 0);
          }
          else if (!OBJECT.order_content) {
            return showAlertAndFocus('order_content', "내용을 입력해주세요.", 0);
          }
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