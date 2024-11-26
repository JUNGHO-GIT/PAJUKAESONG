// ImportUtils.tsx

import { dataArray } from "@assets/scripts/dataArray";
import { randomNumber, randomTime } from "@assets/scripts/utils";
import { calcDate, strToDecimal, decimalToStr } from "@assets/scripts/utils";
import { insertComma } from "@assets/scripts/utils";
import { makePhoneNumber, makeForm } from "@assets/scripts/utils";
import { getLocal, setLocal, getSession, setSession } from "@assets/scripts/storage";


// -------------------------------------------------------------------------------------------------
export {
  dataArray,
  randomNumber,
  randomTime,
  insertComma,
  calcDate,
  makePhoneNumber,
  strToDecimal,
  decimalToStr,
  getLocal,
  setLocal,
  getSession,
  setSession,
  makeForm,
};