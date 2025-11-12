// Card.tsx

import { useEffect, useRef, memo } from "@exportReacts";
import { Card as MuiCard } from "@exportMuis";
import { CardProps } from "@exportMuis";

// -------------------------------------------------------------------------------------------------
export const Card = memo((props: CardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // style 속성 자체를 제거
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.removeAttribute("style");
    }
  }, []);

  return (
    <MuiCard
      {...props}
      ref={cardRef}
      component={"div"}
      className={props?.className || ""}
    />
  );
});