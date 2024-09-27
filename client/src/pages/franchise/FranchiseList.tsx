// FranchiseList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { axios } from "@imports/ImportLibs";
import { Loading } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
import { Empty } from "@imports/ImportContainers";
import { Div, Img, Hr, Br, Btn } from "@imports/ImportComponents";
import { Select } from "@imports/ImportContainers";
import { Paper, Card, Grid, MenuItem, TablePagination } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
export const FranchiseList = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    URL, SUBFIX, navigate, isAdmin, location_category
  } = useCommonValue();

  // 2-1. useState ---------------------------------------------------------------------------------
  const [LOADING, setLOADING] = useState<boolean>(false);
  const [OBJECT, setOBJECT] = useState<any>([Franchise]);
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
      setOBJECT(res.data.result.length > 0 ? res.data.result : [Franchise]);
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
      <Div className={"fs-2-0rem fw-700 fadeIn"}>
        가맹 지점
      </Div>
    );
    // 2. list
    const listSection = (item: any, i: number) => (
      <Card className={"border-1 shadow-3 radius p-20 fadeIn"} key={i}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-row-center"}>
            <Img
              max={110}
              hover={true}
              shadow={true}
              radius={false}
              group={"franchise"}
              src={item?.franchise_images?.[0]}
              className={"w-100p"}
              onClick={() => {
                navigate("/franchise/detail", {
                  state: {
                    _id: item?._id
                  }
                });
              }}
            />
          </Grid>
          <Hr px={20} h={2} className={"bg-burgundy"} />
          <Grid size={12} className={"d-row-center"}>
            <Div className={"fs-1-4rem fw-600"}>
              {item?.franchise_name}
            </Div>
          </Grid>
        </Grid>
      </Card>
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
                navigate("/franchise/save");
              }}
            >
              등록
            </Btn>
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
            {COUNT.totalCnt <= 0 ? <Empty /> : (
              <Grid container spacing={2} columns={12}>
                {OBJECT.map((item: any, i: number) => (
                  <Grid size={12} className={"d-column-center p-0"} key={i}>
                    {listSection(item, i)}
                  </Grid>
                ))}
              </Grid>
            )}
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
      {LOADING ? <Loading /> : listNode()}
    </>
  );
};