// MenuList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Menu } from "@imports/ImportSchemas";
import { Empty } from "@imports/ImportContainers";
import { Div, Img, Hr, Br, Select, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, navigate, isAdmin, location_category
  } = useCommonValue();
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>([Menu]);
  const [PAGING, setPAGING] = useState<any>({
    sort: "asc",
    page: 0,
  });
  const [COUNT, setCOUNT] = useState<any>({
    totalCnt: 0,
  });

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    setLOADING(true);
    axios.get(`${URL}${SUBFIX}/list`, {
      params: {
        PAGING: PAGING,
        category: location_category
      }
    })
    .then((res: any) => {
      setOBJECT(res.data.result.length > 0 ? res.data.result : [Menu]);
      setCOUNT((prev: any) => ({
        ...prev,
        totalCnt: res.data.totalCnt || 0,
      }));
    })
    .catch((err: any) => {
      alert(err.response.data.msg);
      console.error(err);
    })
    .finally(() => {
      setLOADING(false);
    });
  }, [URL, SUBFIX, PAGING, location_category]);

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700 fadeIn"}
      >
        {location_category === "main" ? "대표 메뉴" : "사이드 메뉴"}
      </Div>
    );
    // 2. list
    const listSection = (i: number) => (
      <Grid container spacing={1} columns={12} key={i}>
        {OBJECT?.map((item: any, index: number) => (
          <Card className={"border-1 radius shadow p-20 fadeIn"} key={index}>
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
              <Img
                group={"menu"}
                key={item?.menu_images?.[0]}
                src={item?.menu_images?.[0]}
                className={"w-105p h-105p object-cover drop-shadow"}
                onClick={() => {
                  navigate("/menu/detail", {
                    state: {
                      _id: item?._id
                    }
                  });
                }}
              />
              <Hr px={50} className={"bg-light-grey"} />
              <Div className={"fs-1-4rem fw-600"}>
                {item?.menu_name}
              </Div>
            </Grid>
          </Card>
        ))}
      </Grid>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"px-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={4} className={"d-center"}>
            <Select
              label={"정렬"}
              value={PAGING?.sort}
              inputclass={"h-min0 h-4vh"}
              onChange={(e: any) => (
                setPAGING((prev: any) => ({
                  ...prev,
                  sort: e.target.value
                }))
              )}
            >
              {["asc", "desc"]?.map((item: string) => (
                <MenuItem
                  key={item}
                  value={item}
                  selected={PAGING?.sort === item}
                  onChange={(e: any) => (
                    setPAGING((prev: any) => ({
                      ...prev,
                      sort: e.target.value
                    }))
                  )}
                >
                  <Div className={"fs-0-9rem"}>
                    {item === "asc" && "오름차순"}
                    {item === "desc" && "내림차순"}
                  </Div>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={6} className={"d-center"}>
            <TablePagination
              rowsPerPageOptions={[10]}
              rowsPerPage={10}
              component={"div"}
              labelRowsPerPage={""}
              count={COUNT.totalCnt}
              page={PAGING.page}
              showFirstButton={true}
              showLastButton={true}
              onPageChange={(_event, newPage) => {
                setPAGING((prev: any) => ({
                  ...prev,
                  page: newPage
                }));
              }}
              onRowsPerPageChange={(event) => {
                setPAGING((prev: any) => ({
                  ...prev,
                  limit: parseFloat(event.target.value)
                }));
              }}
            />
          </Grid>
          <Grid size={2} className={`${isAdmin ? "d-center" : "d-none"}`}>
            <Btn
              className={"bg-burgundy"}
              onClick={() => {
                navigate("/menu/save");
              }}
            >
              {"등록"}
            </Btn>
          </Grid>
        </Grid>
      </Card>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper d-center"}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : (
              COUNT.totalCnt <= 0 ? <Empty /> : listSection(0)
            )}
          </Grid>
          <Hr px={20} h={1} w={95} className={"bg-grey"} />
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {filterSection(0)}
          </Grid>
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