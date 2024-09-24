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
    validate.current = (OBJECT: any, fileList?: any) => {
      try {
        // 1. save
        if (PATH.includes("/menu/save") || PATH.includes("/menu/update")) {
          const target = [
            "menu_category",
            "menu_name",
            "menu_description",
            "menu_price",
            "menu_images",
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
          if (!OBJECT.menu_category) {
            return showAlertAndFocus('menu_category', "메뉴 카테고리를 선택해주세요.", 0);
          }
          else if (!OBJECT.menu_name) {
            return showAlertAndFocus('menu_name', "메뉴 이름을 입력해주세요.", 0);
          }
          else if (!OBJECT.menu_description) {
            return showAlertAndFocus('menu_description', "메뉴 설명을 입력해주세요.", 0);
          }
          else if (!OBJECT.menu_price) {
            return showAlertAndFocus('menu_price', "메뉴 가격을 입력해주세요.", 0);
          }
          else if (OBJECT.menu_images.length === 0 && fileList.length === 0) {
            return showAlertAndFocus('menu_images', "메뉴 이미지를 등록해주세요.", 0);
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