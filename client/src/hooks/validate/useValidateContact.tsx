// useValidateContact.tsx

import { useState, createRef, useRef } from "@importReacts";
import { useStoreAlert, useStoreConfirm } from "@importHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateContact = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { ALERT, setALERT } = useStoreAlert();
  const { CONFIRM, setCONFIRM } = useStoreConfirm();

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
        "contact_category",
        "contact_name",
        "contact_email",
        "contact_phone",
        "contact_title",
        "contact_content",
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
      if (!OBJECT?.contact_category) {
        return showAlertAndFocus('contact_category', "문의 유형을 선택해주세요.", 0);
      }
      else if (!OBJECT?.contact_name) {
        return showAlertAndFocus('contact_name', "이름을 입력해주세요.", 0);
      }
      else if (!OBJECT?.contact_email) {
        return showAlertAndFocus('contact_email', "이메일을 입력해주세요.", 0);
      }
      else if (!await validateEmail(OBJECT?.contact_email)) {
        return showAlertAndFocus('contact_email', "이메일 형식으로 입력해주세요.", 0);
      }
      else if (!OBJECT?.contact_phone) {
        return showAlertAndFocus('contact_phone', "전화번호를 입력해주세요.", 0);
      }
      else if (!await validatePhone(OBJECT?.contact_phone)) {
        return showAlertAndFocus('contact_phone', "전화번호 형식으로 입력해주세요.", 0);
      }
      else if (!OBJECT?.contact_title) {
        return showAlertAndFocus('contact_title', "제목을 입력해주세요.", 0);
      }
      else if (!OBJECT?.contact_content) {
        return showAlertAndFocus('contact_content', "내용을 입력해주세요.", 0);
      }
      return true;
    }

    // 2. find -------------------------------------------------------------------------------------
    else if (extra === "find") {
      const target = [
        "contact_name",
        "contact_phone",
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
      if (!OBJECT?.contact_name) {
        return showAlertAndFocus('contact_name', "이름을 입력해주세요.", 0);
      }
      else if (!OBJECT?.contact_phone) {
        return showAlertAndFocus('contact_phone', "전화번호를 입력해주세요.", 0);
      }
      else if (!await validatePhone(OBJECT?.contact_phone)) {
        return showAlertAndFocus('contact_phone', "전화번호 형식으로 입력해주세요.", 0);
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