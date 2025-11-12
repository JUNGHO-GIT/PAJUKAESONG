// useValidateProduct.tsx

import { useState, createRef, useRef } from "@exportReacts";
import { useStoreAlert, useStoreConfirm } from "@exportStores";

// -------------------------------------------------------------------------------------------------
export const useValidateProduct = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { setALERT } = useStoreAlert();
  const { CONFIRM, setCONFIRM } = useStoreConfirm();

  // 2-2. useState ---------------------------------------------------------------------------------
  const REFS = useRef<any[]>([]);
  const [ERRORS, setERRORS] = useState<any[]>([]);
  const validate = useRef<Function>(() => {});

  // alert 표시 및 focus ---------------------------------------------------------------------------
  const showAlertAndFocus = (field: string, msg: string, idx: number) => {
    setALERT({
      open: true,
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
      else if (OBJECT?.product_images?.length === 0 && (!fileList || fileList?.length === 0)) {
        return showAlertAndFocus('product_images', "상품 이미지를 등록해주세요.", 0);
      }
      return true;
    }

    // 3. delete ---------------------------------------------------------------------------------
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