// Img.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
declare type ImgProps = React.HTMLAttributes<HTMLImageElement> & {
  group?: string;
  src?: any;
  hover?: boolean;
  shadow?: boolean;
  radius?: boolean;
  max?: number;
};

// -------------------------------------------------------------------------------------------------
export const Img = (
  { group, src, hover, shadow, radius, max, ...props }: ImgProps
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

    let newClass = "h-auto object-contain";
    if (props?.className) {
      newClass += ` ${props.className}`;
    }
    if (hover) {
      newClass += " hover";
    }
    if (shadow) {
      newClass += " shadow-3";
    }
    if (radius) {
      newClass += " radius-1";
    }
    if (max) {
      newClass += ` w-max${max} h-max${max}`;
    }
    setImageClass(newClass);
  }, [group, src, props.className, hover, shadow, radius, max]);

  // 10. return ------------------------------------------------------------------------------------
  return (
    <img
      {...props}
      alt={fileName}
      key={fileName}
      className={imageClass}
      src={imgSrc}
      onError={(e) => {
        e.currentTarget.src = `${GCLOUD_URL}/main/empty.webp`;
        e.currentTarget.alt = "empty";
      }}
    />
  );
};
