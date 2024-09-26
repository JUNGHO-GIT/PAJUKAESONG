// Img.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";

// -------------------------------------------------------------------------------------------------
declare type ImgProps = React.HTMLAttributes<HTMLImageElement> & {
  group?: string;
  src?: string;
  hover?: boolean;
  shadow?: boolean;
  max?: number;
};

// -------------------------------------------------------------------------------------------------
export const Img = ( { group, src, hover, shadow, max, ...props }: ImgProps ) => {

  // 1. common -------------------------------------------------------------------------------------
  let { GCLOUD_URL } = useCommonValue();
  let groupProps: string = group || "new";
  let srcProps: string = src || "";
  let fileName: string = "empty";
  let srcResult: string = "";
  let defaultImage: string = "https://via.placeholder.com/150";
  let imageClass: any = "";
  let imageStyle: any = {};

  if (srcProps) {
    fileName = srcProps.split("/").pop()?.split(".")[0] || "empty";
    srcResult = groupProps === "new" ? srcProps : `${GCLOUD_URL}/${groupProps}/${srcProps}`;
  }

  if (!props?.className) {
    imageClass = `radius object-cover`;
  }
  else {
    imageClass = `${props?.className} radius object-cover`;
  }

  if (hover) {
    imageClass += " hover";
  }
  if (shadow) {
    imageClass += " shadow-4";
  }

  if (max) {
    imageStyle = {
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
