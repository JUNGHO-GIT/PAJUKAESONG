// NoticeDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { axios } from "@imports/ImportUtils";
import { Loading } from "@imports/ImportLayouts";
import { Notice } from "@imports/ImportSchemas";
import { Div, Hr, Icons, Img, Br } from "@imports/ImportComponents";
import { TextArea } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const NoticeDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, isAdmin, URL, SUBFIX
  } = useCommonValue();
  const {
    getDayFmt,
  } = useCommonDate();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Notice);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Notice);
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX, location_id]);

  // 3. flow ---------------------------------------------------------------------------------------
  const flowDelete = () => {
    setLOADING(true);
    axios.delete(`${URL}${SUBFIX}/delete`, {
      params: {
        _id: OBJECT?._id
      }
    })
    .then((res: any) => {
      if (res.data.status === "success") {
        alert(res.data.msg);
        navigate("/notice/list");
      }
      else {
        alert(res.data.msg);
      }
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  };

  // 7. detailNode ---------------------------------------------------------------------------------
  const detailNode = () => {
    // 1. title
    const titleSection = () => (
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              공지사항 상세
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. detail
    const detailSection = () => (
      <Card className={"border-1 shadow-1 radius-1 p-30"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-1-8rem fw-700 black"}>
              {OBJECT?.notice_title}
            </Div>
          </Grid>
          <Hr px={10} className={"bg-burgundy"} />
          <Grid size={12} className={"d-column-center"}>
            <Img
              max={200}
              hover={false}
              shadow={true}
              radius={false}
              group={"notice"}
              src={OBJECT?.notice_images?.[0]}
              className={"w-100p h-auto"}
            />
          </Grid>
          <Grid size={12} className={"d-column-center"}>
            <TextArea
              label={""}
              required={true}
              readOnly={true}
              value={OBJECT?.notice_content}
              inputclass={"h-35vh border-none"}
            />
          </Grid>
          <Grid size={6} className={"d-row-left"}>
            <Icons
              key={"Calendar"}
              name={"Calendar"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-1-0rem fw-500"}>
              {getDayFmt(OBJECT?.notice_regDt)}
            </Div>
          </Grid>
          <Grid size={6} className={"d-row-right"}>
            <Icons
              key={"View"}
              name={"View"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-1-0rem fw-500"}>
              {OBJECT?.notice_view}
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={isAdmin ? 6 : 12} className={"d-row-left"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                navigate("/notice/list");
              }}
            >
              목록으로
            </Div>
          </Grid>
          <Grid size={isAdmin ? 6 : 0} className={`${isAdmin ? "d-row-right" : "d-none"}`}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
              onClick={() => {
                navigate("/notice/update", {
                  state: {
                    _id: OBJECT?._id
                  }
                });
              }}
            >
              수정
            </Div>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy ms-10"}
              onClick={() => {
                flowDelete();
              }}
            >
              삭제
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper fadeIn"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
            <Br px={30} />
            {detailSection()}
            <Hr px={40} w={90} className={"bg-grey"} />
            {filterSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {LOADING ? <Loading /> : detailNode()}
    </>
  );
};