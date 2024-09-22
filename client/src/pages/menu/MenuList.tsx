// MenuList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Menu } from "@imports/ImportSchemas";
import { Div, Img, Hr, Br, Input, Select, Btn, Icons } from "@imports/ImportComponents";
import { Paper, Card, Grid, MenuItem, TablePagination, Backdrop } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const MenuList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, navigate, isAdmin,
  } = useCommonValue();

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
    const listSection = (i: number) => (
      <Grid container spacing={2} columns={12} key={i}>
        {OBJECT?.map((item: any, index: number) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }} key={index}>
            <Paper className={"border radius shadow p-30 fadeIn"} key={index}>
              <Icons
                key={"Search"}
                name={"Search"}
                className={"w-20 h-20 d-right"}
                onClick={() => {
                  navigate("/menu/detail", {
                    state: {
                      _id: item._id
                    }
                  });
                }}
              />
              <Img
                key={item.menu_images[0]}
                src={item.menu_images[0]}
                group={"menu"}
                className={"w-200 h-200"}
              />
              <Div className={"fs-1-2rem"}>
                {item.menu_name}
              </Div>
              <Div className={"fs-1-0rem"}>
                {item.menu_price}
              </Div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
    // 3. filter
    const filterSection = (i: number) => (
      <Card className={"mx-20 mt-n10 fadeIn"} key={i}>
        <Grid container spacing={1} columns={12}>
          <Grid size={3} className={"d-center"}>
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
          <Grid size={7} className={"d-center"}>
            <TablePagination
              rowsPerPageOptions={[10]}
              rowsPerPage={10}
              component={"div"}
              labelRowsPerPage={""}
              count={COUNT.totalCnt}
              page={PAGING.page}
              showFirstButton={true}
              showLastButton={true}
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
      <Paper className={"content-wrapper h-min75vh"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {titleSection()}
          </Grid>
          <Grid size={{ xs: 12, sm: 11, md: 10, lg: 9, xl: 8 }} className={"d-center"}>
            {LOADING ? <Loading /> : listSection(0)}
          </Grid>
          <Hr px={20} h={15} w={90} className={"bg-grey"} />
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