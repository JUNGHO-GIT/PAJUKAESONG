// useStorageSession.tsx

import { useState, useEffect, memo } from "@importReacts";
import { fnGetSession, fnSetSession } from "@importScripts";

// -------------------------------------------------------------------------------------------------
export const useStorageSession = (key1: string, key2: string, key3: string, initialVal: any) => {

  // -----------------------------------------------------------------------------------------------
  const [storedVal, setStoredVal] = useState<any>(() => {
    return fnGetSession(key1, key2, key3) || initialVal;
  });

  // -----------------------------------------------------------------------------------------------
  useEffect(() => {
    fnSetSession(key1, key2, key3, storedVal);
  }, [key1, key2, key3, storedVal]);

  // -----------------------------------------------------------------------------------------------
  return [storedVal, setStoredVal];
};
