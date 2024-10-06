// useValidateNotice.tsx

import { useState, createRef, useRef } from "@imports/ImportReacts";
import { useAlertStore } from "@imports/ImportStores";

// -------------------------------------------------------------------------------------------------
export const useValidateNotice = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { ALERT, setALERT } = useAlertStore();

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

  // 7. validate -----------------------------------------------------------------------------------
  validate.current = (OBJECT: any, fileList?: any, extra?:string) => {

    // 1. save, update
    if (extra === "save" || extra === "update") {
      const target = [
        "notice_title",
        "notice_content",
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
      if (!OBJECT?.notice_title) {
        return showAlertAndFocus('notice_title', "제목을 입력해주세요.", 0);
      }
      else if (!OBJECT?.notice_content) {
        return showAlertAndFocus('notice_content', "내용을 입력해주세요.", 0);
      }
      return true;
    }
  };

  // 10. return ------------------------------------------------------------------------------------
  return {
    ERRORS: ERRORS,
    REFS: REFS.current,
    validate: validate.current,
  };
};