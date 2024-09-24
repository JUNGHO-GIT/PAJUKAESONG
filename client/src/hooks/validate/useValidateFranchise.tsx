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

  // 휴대폰 번호 형식 ------------------------------------------------------------------------------
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    validate.current = (OBJECT: any, fileList?: any) => {
      try {
        // 1. save
        if (PATH.includes("/franchise/save") || PATH.includes("/franchise/update")) {
          const target = [
            "franchise_name",
            "franchise_address_main",
            "franchise_address_detail",
            "franchise_phone",
            "franchise_images",
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
          if (!OBJECT?.franchise_name) {
            return showAlertAndFocus('franchise_name', "가맹점 이름을 입력해주세요.", 0);
          }
          else if (!OBJECT?.franchise_address_main) {
            return showAlertAndFocus('franchise_address_main', "가맹점 주소를 입력해주세요.", 0);
          }
          else if (!OBJECT?.franchise_address_detail) {
            return showAlertAndFocus('franchise_address_detail', "가맹점 상세주소를 입력해주세요.", 0);
          }
          else if (!OBJECT?.franchise_phone) {
            return showAlertAndFocus('franchise_phone', "가맹점 전화번호를 입력해주세요.", 0);
          }
          else if (!validatePhone(OBJECT?.franchise_phone)) {
            return showAlertAndFocus('franchise_phone', "전화번호 형식으로 입력해주세요.", 0);
          }
          else if (OBJECT?.franchise_images.length === 0 && fileList.length === 0) {
            return showAlertAndFocus('franchise_images', "메뉴 이미지를 등록해주세요.", 0);
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