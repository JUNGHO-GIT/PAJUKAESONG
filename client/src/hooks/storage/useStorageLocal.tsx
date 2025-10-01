// useStorageLocal.tsx

import { useState, useEffect, memo } from "@importReacts";
import { fnGetLocal, fnSetLocal } from "@importScripts";

// -------------------------------------------------------------------------------------------------
export const useStorageLocal = (key1: string, key2: string, key3: string, initialVal: any) => {

  // -----------------------------------------------------------------------------------------------
  const [storedVal, setStoredVal] = useState<any>(() => {
    return fnGetLocal(key1, key2, key3) || initialVal;
  });

  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    fnSetLocal(key1, key2, key3, storedVal);
  }, [key1, key2, key3, storedVal]);

  // -----------------------------------------------------------------------------------------------
  return [storedVal, setStoredVal];
};
