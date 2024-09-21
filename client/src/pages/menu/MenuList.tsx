// MenuList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { axios, moment } from "@imports/ImportLibs";
import { Menu } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Input, Select, Btn } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, navigate, isAdmin,
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
        PAGING: PAGING
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
  }, [URL, SUBFIX, PAGING]);

  // 7. listNode -----------------------------------------------------------------------------------
  const listNode = () => {
    // 1. title
    const titleSection = () => (
      <Div
        key={"title"}
        className={"fs-2-0rem fw-700"}
      >
        대표 메뉴
      </Div>
    );
    // 2. list
    const listSection = () => {
      const listFragment = (item: any, index: number) => (
        <Card className={"border radius shadow p-30 fadeIn"} key={index}>
          <Grid container spacing={2} columns={12}>
            <Grid size={4}>
              <Img
                key={item.menu_image[0]}
                src={item.menu_image[0]}
                group={"menu"}
                className={"w-200 h-200"}
              />
              <Div className={"fs-1-2rem"}>
                {item.menu_title}
              </Div>
              <Div className={"fs-1-0rem"}>
                {item.menu_price}
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      return (
        OBJECT?.map((item: any, index: number) => (
          listFragment(item, index)
        ))
      );
    };
    // 3. filter
    const filterSection = () => (
      <Grid container spacing={2} className={"d-center"}>
        <Grid size={3}>
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
        <Grid size={isAdmin ? 7 : 9}>
          <TablePagination
            rowsPerPageOptions={[10]}
            rowsPerPage={10}
            component={"div"}
            labelRowsPerPage={""}
            count={COUNT.totalCnt}
            page={PAGING.page}
            showFirstButton={true}
            showLastButton={true}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPageChange={(event, newPage) => {
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
        <Grid size={isAdmin ? 2 : 0} className={`${isAdmin ? "" : "d-none"}`}>
          <Btn
            className={"bg-burgundy"}
            onClick={() => {
              navigate("/menu/save");
            }}
          >
            작성
          </Btn>
        </Grid>
      </Grid>
    );
    // 10. return
    return (
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {listSection()}
          </Grid>
          <Hr px={30} h={10} w={80} className={"bg-grey"} />
          <Grid size={12}>
            {filterSection()}
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