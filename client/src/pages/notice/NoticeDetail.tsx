// NoticeDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon } from "@imports/ImportHooks";
import { NOTICE } from "@imports/ImportBases";
import { Div, Img, Hr, Br } from "@imports/ImportComponents";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, isAdmin,
  } = useCommon();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [OBJECT, setOBJECT] = useState<any>(NOTICE);
  const [STATE, setSTATE] = useState<any>({
    id: location_id
  });

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        공지사항 상세
      </Div>
    );
    // 2. detail
    const detailSection = () => (
      <Card className={"border radius shadow p-30"}>
        <Grid container spacing={2} className={"text-left"}>
          <Grid size={12}>
            <Div className={"fs-1-8rem fw-700"}>
              {OBJECT.notice_title}
            </Div>
          </Grid>
          <Br px={10} />
          <Grid size={12}>
            <Div className={"fs-1-0rem fw-500"}>
              {OBJECT.notice_content}
            </Div>
          </Grid>
          <Br px={10} />
          <Grid size={12}>
            <Div className={"fs-0-8rem"}>
              작성일: {OBJECT.notice_date}
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2}>
          <Br px={10} />
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Br px={10} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {detailSection()}
          </Grid>
          <Br px={10} />
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {detailNode()}
    </>
  );
};