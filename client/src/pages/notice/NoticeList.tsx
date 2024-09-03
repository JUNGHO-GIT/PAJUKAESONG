// NoticeList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { NOTICE } from "@imports/ImportStates";
import { Div, Img, Hr, Br } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeList = () => {

  // 1. common -------------------------------------------------------------------------------------

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState([NOTICE]);

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        공지사항
      </Div>
    );
    // 2. list
    const listSection = () => (
      <Card className={"border radius shadow p-30"}>
        <Grid container spacing={2} className={"text-center"}>
          <Grid size={1}>
            <Div className={"fs-0-9rem fw-500"}>
              번호
            </Div>
          </Grid>
          <Grid size={7}>
            <Div className={"fs-0-9rem fw-500"}>
              제목
            </Div>
          </Grid>
          <Grid size={2}>
            <Div className={"fs-0-9rem fw-500"}>
              작성일
            </Div>
          </Grid>
          <Grid size={2}>
            <Div className={"fs-0-9rem fw-500"}>
              조회수
            </Div>
          </Grid>
          <Hr px={10} className={"bg-burgundy"} />
          {OBJECT?.map((item: any, index: number) => (
            <Grid key={index} container spacing={2} className={"text-left"}>
              <Grid size={1}>
                <Div className={"fs-1-0rem"}>
                  {item.notice_number}
                </Div>
              </Grid>
              <Grid size={7}>
                <Div className={"fs-1-0rem"}>
                  {item.notice_title || "제목이 없습니다."}
                </Div>
              </Grid>
              <Grid size={2}>
                <Div className={"fs-1-0rem"}>
                  {item.notice_regDt || "작성일이 없습니다."}
                </Div>
              </Grid>
              <Grid size={2}>
                <Div className={"fs-1-0rem"}>
                  {item.notice_view || "조회수가 없습니다."}
                </Div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Card>
    );
    // 3. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Br px={10} />
          <Grid size={12} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Br px={10} />
          <Grid size={12} className={"d-center"}>
            {listSection()}
          </Grid>
          <Br px={10} />
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {listNode()}
    </>
  );
};