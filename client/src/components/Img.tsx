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
export const Img = ( { group, src, hover, shadow, radius, max, ...props }: ImgProps ) => {

  // 1. common -------------------------------------------------------------------------------------
  let { GCLOUD_URL } = useCommonValue();
  let fileName: string = "";
  let srcResult: string = "";
  let defaultImage: string = "https://via.placeholder.com/150";
  let imageClass: any = "";
  let imageStyle: any = {};

  if (src && typeof src === "string") {
    fileName = src.split("/").pop()?.split(".")[0] || "empty";
    srcResult = group === "new" ? src : `${GCLOUD_URL}/${group}/${src}`;
  }

  if (!props?.className) {
    imageClass = `h-auto object-cover`;
  }
  else {
    imageClass = `${props?.className} h-auto object-cover`;
  }

  if (hover) {
    imageStyle = {
      ...imageStyle,
      cursor: "pointer",
      transition: "transform 0.3s ease",
    };
  }
  if (shadow) {
    imageStyle = {
      ...imageStyle,
      filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))",
    };
  }
  if (radius) {
    imageStyle = {
      ...imageStyle,
      borderRadius: "10px",
    };
  }
  if (max) {
    imageStyle = {
      ...imageStyle,
      maxWidth: `${max}px`,
      maxHeight: `${max}px`,
    };
  }

  // 2-1. useState ---------------------------------------------------------------------------------
  const [imgSrc, setImgSrc] = useState(srcResult);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setImgSrc(srcResult);
  }, [srcResult]);

  // 3. handle -------------------------------------------------------------------------------------
  const handleError = () => {
    setImgSrc(defaultImage);
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <img
      {...props}
      src={imgSrc}
      alt={fileName}
      key={fileName}
      loading={"lazy"}
      onError={handleError}
      style={imageStyle}
      className={imageClass}
    />
  );
};
