// useValidateFranchise.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateFranchise = () => {

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

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    validate.current = (OBJECT: any) => {
      try {
        // 1. save
        if (PATH.includes("/franchise/save") || PATH.includes("/franchise/update")) {
          const target = [
            "franchise_name",
            "franchise_address_main",
            "franchise_address_detail",
            "franchise_phone",
            "franchise_image",
          ];
          REFS.current = (
            Array.from({ length: 0 }, (_, _idx) => (
              target.reduce((acc, cur) => ({
                ...acc,
                [cur]: createRef()
              }), {})
            ))
          );
          setERRORS (
            Array.from({ length: 0 }, (_, _idx) => (
              target.reduce((acc, cur) => ({
                ...acc,
                [cur]: false
              }), {})
            ))
          );
          if (!OBJECT.franchise_name) {
            return showAlertAndFocus('franchise_name', "가맹점 이름을 입력해주세요.", 0);
          }
          else if (!OBJECT.franchise_address_main) {
            return showAlertAndFocus('franchise_address_main', "가맹점 주소를 입력해주세요.", 0);
          }
          else if (!OBJECT.franchise_address_detail) {
            return showAlertAndFocus('franchise_address_detail', "가맹점 상세주소를 입력해주세요.", 0);
          }
          else if (!OBJECT.franchise_phone) {
            return showAlertAndFocus('franchise_phone', "가맹점 전화번호를 입력해주세요.", 0);
          }
          else if (!OBJECT.franchise_image) {
            return showAlertAndFocus('franchise_image', "가맹점 이미지를 등록해주세요.", 0);
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