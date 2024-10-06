// useValidateProduct.tsx

import { useState, createRef, useRef } from "@imports/ImportReacts";
import { useAlertStore } from "@imports/ImportStores";

// -------------------------------------------------------------------------------------------------
export const useValidateProduct = () => {

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
        "product_category",
        "product_name",
        "product_description",
        "product_price",
        "product_images",
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
      if (!OBJECT?.product_category) {
        return showAlertAndFocus('product_category', "상품 카테고리를 선택해주세요.", 0);
      }
      else if (!OBJECT?.product_name) {
        return showAlertAndFocus('product_name', "상품 이름을 입력해주세요.", 0);
      }
      else if (!OBJECT?.product_description) {
        return showAlertAndFocus('product_description', "상품 설명을 입력해주세요.", 0);
      }
      else if (!OBJECT?.product_price) {
        return showAlertAndFocus('product_price', "상품 가격을 입력해주세요.", 0);
      }
      else if (OBJECT?.product_images.length === 0 && fileList.length === 0) {
        return showAlertAndFocus('product_images', "상품 이미지를 등록해주세요.", 0);
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