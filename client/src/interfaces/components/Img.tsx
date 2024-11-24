// Img.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue } from "@importHooks";

// -------------------------------------------------------------------------------------------------
declare type ImgProps = React.HTMLAttributes<HTMLImageElement> & {
  group?: string;
  src?: any;
  hover?: boolean;
  shadow?: boolean;
  radius?: boolean;
  border?: boolean;
  max?: number;
  loading?: "eager" | "lazy";
};

// -------------------------------------------------------------------------------------------------
export const Img = (
  { group, src, hover, shadow, radius, border, max, loading, ...props }: ImgProps
) => {

  // 1. common -------------------------------------------------------------------------------------
  const { GCLOUD_URL } = useCommonValue();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [fileName, setFileName] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imageClass, setImageClass] = useState<string>("");

  // 2-2. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (src && typeof src === "string") {
      setFileName(src.split("/").pop()?.split(".")[0] || "empty");
      setImgSrc(group === "new" ? src : `${GCLOUD_URL}/${group || "main"}/${src}`);
    }
    else {
      setFileName("empty");
      setImgSrc(`${GCLOUD_URL}/main/empty.webp`);
    }

    let newClass = "w-100p h-100p object-contain";

    if (props?.className) {
      newClass += ` ${props.className}`;
    }
    if (hover) {
      newClass += " hover";
    }
    if (shadow) {
      newClass += " shadow-2";
    }
    if (radius) {
      newClass += " radius-3";
    }
    if (border) {
      newClass += " border-1";
    }
    if (max) {
      newClass += ` w-max-${max}px h-max-${max}px`;
    }

    setImageClass(newClass);

  }, [GCLOUD_URL, group, props.className, hover, shadow, radius, max, src]);

  // 10. return ------------------------------------------------------------------------------------
  return (
    <img
      {...props}
      alt={fileName}
      key={fileName}
      src={imgSrc}
      loading={loading || "lazy"}
      className={imageClass}
      onError={(e) => {
        e.currentTarget.style.width = "100%";
        e.currentTarget.style.height = "100%";
        e.currentTarget.src = `${GCLOUD_URL}/main/empty.webp`;
        e.currentTarget.alt = "empty";
      }}
    />
  );
};
