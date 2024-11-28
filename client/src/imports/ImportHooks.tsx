// ImportHooks.tsx

// common
import { useCommonValue } from "@hooks/common/useCommonValue";
import { useCommonDate } from "@hooks/common/useCommonDate";

// language
import { useLanguageSetting } from "@hooks/language/useLanguageSetting";

// validate
import { useValidateContact } from "@hooks/validate/useValidateContact";
import { useValidateFranchise } from "@hooks/validate/useValidateFranchise";
import { useValidateMenu } from "@hooks/validate/useValidateMenu";
import { useValidateNotice } from "@hooks/validate/useValidateNotice";
import { useValidateOrder } from "@hooks/validate/useValidateOrder";
import { useValidateProduct } from "@hooks/validate/useValidateProduct";
import { useValidateUser } from "@hooks/validate/useValidateUser";

// storage
import { useStorageSession } from "@hooks/storage/useStorageSession";
import { useStorageLocal } from "@hooks/storage/useStorageLocal";

// utils
import { useRoot } from "@hooks/utils/useRoot";
import { useScrollTop } from "@hooks/utils/useScrollTop";
import { useResponsive } from "@hooks/utils/useResponsive";
import { useCdn } from "@hooks/utils/useCdn";

// -------------------------------------------------------------------------------------------------
export {

  // common
  useCommonValue,
  useCommonDate,

  // language
  useLanguageSetting,

  // validate
  useValidateContact,
  useValidateFranchise,
  useValidateMenu,
  useValidateNotice,
  useValidateOrder,
  useValidateProduct,
  useValidateUser,

  // storage
  useStorageSession,
  useStorageLocal,

  // utils
  useRoot,
  useScrollTop,
  useResponsive,
  useCdn
};