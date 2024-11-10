// useValidateMenu.tsx

import { useState, createRef, useRef } from "@importReacts";
import { useStoreAlert, useStoreConfirm } from "@importHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateMenu = () => {

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

  // 7. validate -----------------------------------------------------------------------------------
  validate.current = async (OBJECT: any, fileList?: any, extra?:string) => {

    // 1. save, update -----------------------------------------------------------------------------
    if (extra === "save" || extra === "update") {
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
      if (!OBJECT?.menu_category) {
        return showAlertAndFocus('menu_category', "메뉴 카테고리를 선택해주세요.", 0);
      }
      else if (!OBJECT?.menu_name) {
        return showAlertAndFocus('menu_name', "메뉴 이름을 입력해주세요.", 0);
      }
      else if (!OBJECT?.menu_description) {
        return showAlertAndFocus('menu_description', "메뉴 설명을 입력해주세요.", 0);
      }
      else if (!OBJECT?.menu_price) {
        return showAlertAndFocus('menu_price', "메뉴 가격을 입력해주세요.", 0);
      }
      else if (OBJECT?.menu_images?.length === 0 && (!fileList || fileList?.length === 0)) {
        return showAlertAndFocus('menu_images', "메뉴 이미지를 등록해주세요.", 0);
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