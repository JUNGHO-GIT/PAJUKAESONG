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
      // 1. save
      if (PATH.includes("/franchise/save")) {
        const target = [
          "franchise_name",
          "franchise_address_main",
          "franchise_address_detail",
          "franchise_phone",
          "franchise_image",
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
          if (!OBJECT.franchise_name) {
            return showAlertAndFocus('franchise_name', "가맹점 이름을 입력해주세요.");
          }
          else if (!OBJECT.franchise_address_main) {
            return showAlertAndFocus('franchise_address_main', "가맹점 주소를 입력해주세요.");
          }
          else if (!OBJECT.franchise_address_detail) {
            return showAlertAndFocus('franchise_address_detail', "가맹점 상세주소를 입력해주세요.");
          }
          else if (!OBJECT.franchise_phone) {
            return showAlertAndFocus('franchise_phone', "가맹점 전화번호를 입력해주세요.");
          }
          else if (!OBJECT.franchise_image) {
            return showAlertAndFocus('franchise_image', "가맹점 이미지를 등록해주세요.");
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
