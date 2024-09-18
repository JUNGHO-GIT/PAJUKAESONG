// useValidateNotice.tsx

import { useState, useEffect, createRef, useRef } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
export const useValidateNotice = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    PATH,
  } = useCommonValue();

  // 2-2. useState ---------------------------------------------------------------------------------
  const REFS: any = useRef<any>({});
  const [ERRORS, setERRORS] = useState<any>({});
  const validate = useRef<any>(() => {});

  // alert 표시 및 focus ---------------------------------------------------------------------------
  const showAlertAndFocus = (field: string, msg: string, idx: number) => {
    alert(msg);
    REFS.current?.[idx]?.[field]?.current?.focus();
    setERRORS({
      [idx]: {
        [field]: true,
      },
    });
    return false;
  };

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    try {
      // 1. save
      if (PATH.includes("/notice/save")) {
        const target = [
          "notice_title",
          "notice_content",
        ];
        setERRORS(target.reduce((acc: any[], cur: string) => {
          acc.push({
            [cur]: false
          });
          return acc;
        }, []));
        REFS.current = (target.reduce((acc: any[], cur: string) => {
          acc.push({
            [cur]: createRef()
          });
          return acc;
        }, []));
        validate.current = (OBJECT: any) => {
          if (!OBJECT.notice_title) {
            return showAlertAndFocus('notice_title', "제목을 입력해주세요.", 0);
          }
          else if (!OBJECT.notice_content) {
            return showAlertAndFocus('notice_content', "내용을 입력해주세요.", 0);
          }
          else {
            return true;
          }
        }
      }

      // 2. update
      else if (PATH.includes("/notice/update")) {
        const target = [
          "notice_title",
          "notice_content",
        ];
        setERRORS(target.reduce((acc: any[], cur: string) => {
          acc.push({
            [cur]: false
          });
          return acc;
        }, []));
        REFS.current = (target.reduce((acc: any[], cur: string) => {
          acc.push({
            [cur]: createRef()
          });
          return acc;
        }, []));
        validate.current = (OBJECT: any) => {
          if (!OBJECT.notice_title) {
            return showAlertAndFocus('notice_title', "제목을 입력해주세요.", 0);
          }
          else if (!OBJECT.notice_content) {
            return showAlertAndFocus('notice_content', "내용을 입력해주세요.", 0);
          }
          else {
            return true;
          }
        }
      }
    }
    catch (err: any) {
      console.error(err);
    }
  }, [PATH]);

  // 10. return ------------------------------------------------------------------------------------
  return {
    ERRORS: ERRORS,
    REFS: REFS.current,
    validate: validate.current,
  };
};