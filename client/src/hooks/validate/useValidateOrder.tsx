// useValidateOrder.tsx

import { useState, createRef, useRef } from "@imports/ImportReacts";
import { useAlertStore, useConfirmStore } from "@imports/ImportStores";

// -------------------------------------------------------------------------------------------------
export const useValidateOrder = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { ALERT, setALERT } = useAlertStore();
  const { CONFIRM, setCONFIRM } = useConfirmStore();

  // 2-2. useState ---------------------------------------------------------------------------------
  const REFS = useRef<any[]>([]);
  const [ERRORS, setERRORS] = useState<any[]>([]);
  const validate = useRef<Function>(() => {});

  // alert 표시 및 focus ---------------------------------------------------------------------------
  const showAlertAndFocus = (field: string, msg: string, idx: number) => {
    setALERT({
      open: !ALERT.open,
      msg: msg,
      severity: "error",
    });
    if (field) {
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
    }
    return false;
  };

  // 이메일 형식 -----------------------------------------------------------------------------------
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // 휴대폰 번호 형식 ------------------------------------------------------------------------------
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // 7. validate -----------------------------------------------------------------------------------
  validate.current = async (OBJECT: any, fileList?: any, extra?:string) => {

    // 1. save, update -----------------------------------------------------------------------------
    if (extra === "save" || extra === "update") {
      const target = [
        "order_category",
        "order_name",
        "order_email",
        "order_phone",
        "order_date",
        "order_time",
        "order_headcount",
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
      if (!OBJECT?.order_category) {
        return showAlertAndFocus('order_category', "주문 유형을 선택해주세요.", 0);
      }
      else if (!OBJECT?.order_name) {
        return showAlertAndFocus('order_name', "이름을 입력해주세요.", 0);
      }
      else if (!OBJECT?.order_email) {
        return showAlertAndFocus('order_email', "이메일을 입력해주세요.", 0);
      }
      else if (!validateEmail(OBJECT?.order_email)) {
        return showAlertAndFocus('order_email', "이메일 형식으로 입력해주세요.", 0);
      }
      else if (!OBJECT?.order_phone) {
        return showAlertAndFocus('order_phone', "전화번호를 입력해주세요.", 0);
      }
      else if (!validatePhone(OBJECT?.order_phone)) {
        return showAlertAndFocus('order_phone', "전화번호 형식으로 입력해주세요.", 0);
      }
      else if (!OBJECT?.order_date) {
        return showAlertAndFocus('order_date', "주문 날짜를 선택해주세요.", 0);
      }
      else if (!OBJECT?.order_time) {
        return showAlertAndFocus('order_time', "주문 시간을 선택해주세요.", 0);
      }
      else if (!OBJECT?.order_headcount) {
        return showAlertAndFocus('order_headcount', "인원을 입력해주세요.", 0);
      }
      return true;
    }

    // 2. find  ------------------------------------------------------------------------------------
    else if (extra === "find") {
      const target = [
        "order_name",
        "order_phone",
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
      if (!OBJECT?.order_name) {
        return showAlertAndFocus('order_name', "이름을 입력해주세요.", 0);
      }
      else if (!OBJECT?.order_phone) {
        return showAlertAndFocus('order_phone', "전화번호를 입력해주세요.", 0);
      }
      return true;
    }

    // 3. delete -----------------------------------------------------------------------------------
    else if (extra === "delete") {
      const target = [
        "_id",
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
      const confirmResult = new Promise((resolve) => {
        setCONFIRM({
          open: !CONFIRM.open,
          msg: "삭제하시겠습니까?",
        }, (confirmed: boolean) => {
          resolve(confirmed);
        });
      });

      if (await confirmResult) {
        if (!OBJECT?._id || OBJECT?._id === "") {
          return showAlertAndFocus("", "삭제할 데이터가 없습니다.", 0);
        }
        return true;
      }
      else {
        return false;
      }
    }
  };

  // 10. return ------------------------------------------------------------------------------------
  return {
    ERRORS: ERRORS,
    REFS: REFS.current,
    validate: validate.current,
  };
};