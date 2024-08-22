// useResponsive.tsx

import { useTheme, useMediaQuery } from "../../import/ImportMuis.tsx";

// -------------------------------------------------------------------------------------------------
export const useResponsive = () => {
  const theme = useTheme();

  // Media queries
  const isXs = useMediaQuery(
    theme.breakpoints.up("xs") && theme.breakpoints.down("sm")
  );
  const isSm = useMediaQuery(
    theme.breakpoints.up("sm") && theme.breakpoints.down("md")
  );
  const isMd = useMediaQuery(
    theme.breakpoints.up("md") && theme.breakpoints.down("lg")
  );
  const isLg = useMediaQuery(
    theme.breakpoints.up("lg") && theme.breakpoints.down("xl")
  );
  const isXl = useMediaQuery(
    theme.breakpoints.up("xl")
  );

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl
  };
};