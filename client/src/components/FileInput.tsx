// FileInput.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { Div, Br, Img } from "@imports/ImportComponents";
import { MuiFileInput, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FileInput = (props: any) => {

  // 2-1. useState ---------------------------------------------------------------------------------
  const [fileExisting, setFileExisting] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);
  const [fileCount, setFileCount] = useState<number>(0);
  const [fileHeight, setFileHeight] = useState<string>("100px");
  const [fileLimit, setFileLimit] = useState<number>(1);

  // 2-2. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    console.log("===================================");
    console.log("fileList", fileList);
    console.log("fileCount", fileCount);
  }, [fileList, fileCount]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setFileExisting(props?.existing || []);
  }, [props?.existing]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    const defaultInput = props?.inputRef?.current;
    const existAdornment = document.querySelector(`.MuiInputAdornment-root.MuiInputAdornment-positionEnd.MuiInputAdornment-outlined.MuiInputAdornment-sizeSmall`);
    const existLabel = existAdornment?.previousElementSibling;
    const existSpan = document.querySelector(`.notranslate`);
    const adornmentRoot = document.querySelector(`.MuiInputAdornment-root`);

    // 기존 요소 삭제
    if (defaultInput) {
      defaultInput.remove();
    }
    if (existAdornment) {
      existAdornment.remove();
    }
    if (existLabel) {
      existLabel.remove();
    }
    if (existSpan) {
      existSpan.remove();
    }

    // adornment 에 스타일 적용
    if (adornmentRoot) {
      adornmentRoot.setAttribute("style", "width: 100%;");
    }
  }, []);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {

    // 최초 로드 시 파일 배열 초기화
    setFileList(props?.value || []);

    // 파일 높이 계산
    const heightPerFile = 30;
    const minHeight = 100;
    setFileHeight(`${Math.max(minHeight, (props?.value || []).length * heightPerFile)}px`);

    setFileLimit(props?.limit);

  }, [props?.value]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    const newCount = fileList.length;
    const existingCount = fileExisting.length;

    if (newCount + existingCount > 0) {
      setFileCount(newCount + existingCount);
    }
    else {
      setFileCount(0);
    }
  }, [fileList, fileExisting]);

  // 6. handle (파일 추가) -------------------------------------------------------------------------
  const flowFileChange = (newFiles: File[]) => {

    // 파일이 이미지가 아닌 경우
    if (newFiles && newFiles.some((file: File) => !file.type.startsWith("image/"))) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일이 제한 개수 이상인 경우
    else if (newFiles && newFiles.length + fileCount > fileLimit) {
      alert(`파일은 최대 ${fileLimit}개까지 업로드 가능합니다.`);
      return;
    }

    if (newFiles) {
      setFileList((prevFiles: any) => {
        const existingFiles = prevFiles || [];

        // 중복 파일 필터링
        const nonDuplicateFiles = newFiles.filter((newFile) => (
          !existingFiles.some(
            (existingFile: File) => existingFile.name === newFile.name
          )
        ));

        // 부모로 변경된 파일 리스트 전달
        const updatedFiles = [...existingFiles, ...nonDuplicateFiles];
        props?.onChange(updatedFiles);

        return updatedFiles;
      });
    }
  };

  // 5. handle -------------------------------------------------------------------------------------
  // 파일 추가 로직
  const handleFileAdd = (e: any) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.style.display = "none";
    input.onchange = (e: any) => {
      flowFileChange(Array.from(e.target.files));
    };
    document.body.appendChild(input);
    input.click();
  };

  // 6. handle (파일 삭제) -------------------------------------------------------------------------
  const handleFileDelete = (index: number, extra?: string) => {
    if (extra === "single") {
      setFileList((prevFiles: any) => {

        // 부모 컴포넌트에 변경 사항 전달
        const updatedFiles = prevFiles.filter((_file: any, i: number) => i !== index);
        props?.onChange(updatedFiles);

        return updatedFiles;
      });
    }
    else if (extra === "all") {
      setFileList((prevFiles: any) => {
        props?.onChange([]);
        return [];
      });
    }
  };

  // 7. node ---------------------------------------------------------------------------------------
  const adornmentNode = (
    <Grid container spacing={2} columns={12}>
      <Grid size={8}>
        {fileList.length > 0 && fileList.map((file: any, index: number) => (
          <Grid size={12} className={"d-left"} key={index}>
            <Div className={"d-center"}>
              <Img
                key={file?.name}
                group={"new"}
                src={URL.createObjectURL(file)}
                className={"w-25 h-25 me-10"}
              />
            </Div>
            <Div className={"black fs-0-9rem fw-500"}>
              {file?.name.length > 20 ? `${file?.name.slice(0, 20)}...` : file?.name}
            </Div>
            <Div
              className={"black fs-0-9rem fw-500 pointer-burgundy ms-15"}
              onClick={() => handleFileDelete(index, "single")}
            >
              {!file?.name ? "" : "x"}
            </Div>
          </Grid>
        ))}
      </Grid>
      <Grid size={4}>
        <Grid size={12} className={"d-right"}>
          <Div
            className={"fs-1-0rem fw-600 pointer-burgundy"}
            onClick={(e: any) => handleFileAdd(e)}
          >
            파일 추가
          </Div>
        </Grid>
        <Br px={10} />
        <Grid size={12} className={"d-right"}>
          <Div
            className={"fs-1-0rem fw-600 pointer-burgundy"}
            onClick={() => handleFileDelete(0, "all")}
          >
            전체 삭제
          </Div>
        </Grid>
      </Grid>
    </Grid>
  );

  // 7. node ---------------------------------------------------------------------------------------
  const existingNode = () => (
    <Grid container spacing={2} columns={12}>
      {fileExisting.map((file: any, index: number) => (
        <Grid size={12} key={index} className={"d-left"}>
          <Img
            key={file}
            group={props?.group}
            src={file}
            className={"w-25 h-25 me-10"}
          />
          <Div className={"black fs-0-9rem fw-500"}>
            {file.length > 20 ? `${file.slice(0, 20)}...` : file}
          </Div>
          <Div
            className={"black fs-0-9rem fw-500 pointer-burgundy ms-15"}
            onClick={() => {
              setFileExisting((prev: any) => prev.filter((_: any, i: number) => i !== index));
            }}
          >
            {!file ? "" : "x"}
          </Div>
        </Grid>
      ))}
    </Grid>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      <Div className={"d-left black fs-0-9rem fw-400 mt-15"}>
        {props?.required ? `${props?.label} *` : props?.label}
      </Div>
      <Br px={10} />
      <MuiFileInput
        {...props}
        label={""}
        value={[]}
        select={false}
        variant={"outlined"}
        size={props?.size || "small"}
        className={props?.className || ""}
        inputRef={props?.inputRef || null}
        error={props?.error || false}
        fullWidth={props?.fullWidth || true}
        multiline={props?.multiline || true}
        multiple={props?.multiple || true}
        onClick={(e: any) => e.preventDefault()}
        InputProps={{
          readOnly: (
            props?.readOnly || false
          ),
          style: {
            height: fileHeight,
          },
          className: (
            props?.inputclass?.includes("fs-") ? (
              `text-left ${props?.inputclass || ""}`
            ) : (
              `text-left fs-1-0rem ${props?.inputclass || ""}`
            )
          ),
          startAdornment: adornmentNode,
        }}
      />
      <Br px={10} />
      {/** 기존 이미지 표시하기 **/}
      {fileExisting.length > 0 && existingNode()}
    </>
  );
};