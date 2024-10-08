// FranchiseList.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { axios } from "@imports/ImportUtils";
import { Loading, Empty } from "@imports/ImportLayouts";
import { Franchise } from "@imports/ImportSchemas";
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
      <Card className={"p-0"}>
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-column-center"}>
            <Div className={"fs-2-0rem fw-700"}>
              가맹 지점
            </Div>
          </Grid>
        </Grid>
      </Card>
    );
    // 2. list
    const listSection = () => {
      const imageFragment = (i: number) => (
        <Card className={"p-10"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Img
                max={40}
                hover={true}
                shadow={false}
                radius={false}
                group={"franchise"}
                src={OBJECT[i]?.franchise_images?.[0]}
                className={"w-100p"}
                onClick={() => {
                  navigate("/franchise/detail", {
                    state: {
                      _id: OBJECT[i]?._id
                    }
                  });
                }}
              />
            </Grid>
          </Grid>
        </Card>
      );
      const descFragment = (i: number) => (
        <Card className={"p-0"} key={i}>
          <Grid container spacing={2} columns={12}>
            <Grid size={12} className={"d-column-center"}>
              <Div className={"fs-1-2rem fw-600"}>
                {OBJECT[i]?.franchise_name}
              </Div>
            </Grid>
          </Grid>
        </Card>
      );
      return (
        <Grid container spacing={2} columns={12}>
          {OBJECT.map((_item: any, i: number) => (
            <Grid size={12} key={i}>
              {imageFragment(i)}
              <Br px={10} />
              {descFragment(i)}
            </Grid>
          ))}
        </Grid>
      )
    };
    // 3. filter
    const filterSection = () => (
      <Card className={"px-20"}>
        <Grid container spacing={2} columns={12}>
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
                  <Div className={"fs-0-8rem"}>
                    {item === "asc" && "오름차순"}
                    {item === "desc" && "내림차순"}
                  </Div>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid size={7} className={"d-center"}>
            <TablePagination
              rowsPerPageOptions={[6]}
              rowsPerPage={6}
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
            <Div
              className={"fs-1-0rem fw-700 pointer-burgundy"}
              onClick={() => {
                navigate("/franchise/save");
              }}
            >
              등록
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
            {listSection()}
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
      {LOADING ? <Loading /> : listNode()}
    </>
  );
};