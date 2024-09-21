// useValidateMenu.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateMenu = () => {

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
        if (PATH.includes("/menu/save") || PATH.includes("/menu/update")) {
          const target = [
            "menu_category",
            "menu_title",
            "menu_content",
            "menu_price",
            "menu_image",
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
          if (!OBJECT.menu_category) {
            return showAlertAndFocus('menu_category', "메뉴 카테고리를 선택해주세요.", 0);
          }
          else if (!OBJECT.menu_title) {
            return showAlertAndFocus('menu_title', "메뉴 이름을 입력해주세요.", 0);
          }
          else if (!OBJECT.menu_content) {
            return showAlertAndFocus('menu_content', "메뉴 설명을 입력해주세요.", 0);
          }
          else if (!OBJECT.menu_price) {
            return showAlertAndFocus('menu_price', "메뉴 가격을 입력해주세요.", 0);
          }
          else if (!OBJECT.menu_image) {
            return showAlertAndFocus('menu_image', "메뉴 이미지를 등록해주세요.", 0);
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