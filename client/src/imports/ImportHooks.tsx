// ImportHooks.tsx

import { useCommonDate } from "@hooks/common/useCommonDate";
import { useCommonValue } from "@hooks/common/useCommonValue";

import { useStorageSession } from "@hooks/storage/useStorageSession";
import { useStorageLocal } from "@hooks/storage/useStorageLocal";
import { useStorageTest } from "@hooks/storage/useStorageTest";

import { useRoot } from "@hooks/useRoot";
import { useScrollTop } from "@hooks/useScrollTop";
import { useResponsive } from "@hooks/useResponsive";

import { useLanguageSetting } from "@hooks/language/useLanguageSetting";

// -------------------------------------------------------------------------------------------------
export {
  useCommonDate,
  useCommonValue,

  useStorageSession,
  useStorageLocal,
  useStorageTest,

  useRoot,
  useScrollTop,
  useResponsive,

  useLanguageSetting,
};