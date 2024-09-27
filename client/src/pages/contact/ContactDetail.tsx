// ContactDetail.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useCommonDate } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Contact } from "@imports/ImportSchemas";
import { Div, Hr, Icons } from "@imports/ImportComponents";
import { TextArea } from "@imports/ImportContainers";
import { Paper, Card, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const ContactDetail = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    navigate, location_id, URL, SUBFIX
  } = useCommonValue();
  const {
    getDayFmt,
  } = useCommonDate();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>(Contact);

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/detail`, {
      params: {
        _id: location_id
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result || Contact);
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
        navigate('/contact/list', {
          state: {
            contact_name: OBJECT?.contact_name,
            contact_phone: OBJECT?.contact_phone,
          },
        });
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
      <Div className={"fs-2-0rem fw-700 fadeIn"}>
        문의 상세
      </Div>
    );
    // 2. detail
    const detailSection = (i: number) => (
      <Card className={"border-1 shadow-3 radius p-30 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            <Div className={"fs-1-8rem fw-700"}>
              {OBJECT?.contact_title}
            </Div>
            <Div className={"fs-1-8rem fw-500 ms-10 grey"}>
              {`[ ${OBJECT?.contact_category === "franchise" ? "가맹 문의" : "1:1 문의"} ]`}
            </Div>
          </Grid>
          <Hr px={10} className={"bg-burgundy"} />
          <Grid size={12}>
            <TextArea
              label={""}
              readOnly={true}
              inputclass={"h-35vh"}
              className={"border-1 radius p-30"}
              value={OBJECT?.contact_content}
            />
          </Grid>
          <Grid size={6} className={"d-row-left"}>
            <Icons
              key={"Calendar"}
              name={"Calendar"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-0-9rem fw-500"}>
              {getDayFmt(OBJECT?.contact_regDt)}
            </Div>
          </Grid>
          <Grid size={6} className={"d-row-right"}>
            <Icons
              key={"Person"}
              name={"Person"}
              className={"w-20 h-20"}
            />
            <Div className={"fs-0-9rem fw-500"}>
              {OBJECT?.contact_name}
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"px-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={6} className={"d-row-left"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                navigate("/contact/list", {
                  state: {
                    contact_name: OBJECT?.contact_name,
                    contact_phone: OBJECT?.contact_phone
                  }
                });
              }}
            >
              목록으로
            </Div>
          </Grid>
          <Grid size={6} className={"d-row-right"}>
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy me-10"}
              onClick={() => {
                navigate("/contact/update", {
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
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={2} columns={12} direction={"column"}>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            {detailSection(0)}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 6, lg: 6, xl: 6 }} className={"d-column-center"}>
            <Hr px={20} className={"bg-grey"} />
            {filterSection(0)}
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