// SideBar.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useStoreAlert } from "@importHooks";
import { axios } from "@importLibs";
import { Icons, Div, Img, Hr } from "@importComponents";
import { Drawer, List, ListItem, Collapse, Grid } from "@importMuis";

// -------------------------------------------------------------------------------------------------
declare type SideBarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// -------------------------------------------------------------------------------------------------
export const SideBar = (
  { isOpen, toggleSidebar }: SideBarProps
) => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, PATH, navigate, location_category, isAdmin } = useCommonValue();
  const { firstStr, secondStr, dataArray } = useCommonValue();
  const { setALERT } = useStoreAlert();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [appDate, setAppDate] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedListItem, setSelectedListItem] = useState<string>("");

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}/api/admin/appInfo`)
    .then((res: any) => {
      setAppDate(res.data.result.date);
    })
    .catch((err: any) => {
      console.error(err);
    });
  }, []);

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {

    // menu인 경우
    if (firstStr === "menu") {
      setSelectedTab(firstStr);
      setSelectedTabVal(firstStr);
      setSelectedListItem(location_category);
    }

    // product인 경우
    else if (firstStr === "product") {
      setSelectedTab("order");
      setSelectedTabVal("order");
      setSelectedListItem(secondStr);
    }

    // 나머지 경우
    else {
      setSelectedTab(firstStr);
      setSelectedTabVal(firstStr);
      setSelectedListItem(secondStr);
    }

  }, [PATH]);

  // 7. sidebar ------------------------------------------------------------------------------------
  const sideBarNode = () => {
    // 1. logo
    const logoSection = () => (
      <Grid container={true} spacing={0}>
        <Grid size={12} className={"d-center"}>
          <Img
            hover={false}
            shadow={false}
            radius={false}
            group={"main"}
            src={"logo1_1.webp"}
            className={"pointer m-10px h-max-50px"}
            onClick={() => {
              navigate("/main");
            }}
          />
        </Grid>
      </Grid>
    );
    // 2. sidebar
    const sidebarSection = () => (
      <Grid container={true} spacing={0}>
        <Grid size={12} className={"d-col-left"}>
          {dataArray.filter((f: any) => f).map((item, idx) => (
            <List component={"nav"} key={idx}>
              {/* 메인 항목 */}
              <ListItem
                onClick={() => {
                  if (selectedTab === item?.titleEn) {
                    setSelectedTab("");
                  }
                  else {
                    setSelectedTab(item?.titleEn);
                  }
                }}
              >
                <Div className={"d-center"}>
                  <Div className={`pointer-burgundy ${selectedTab === item?.titleEn ? "burgundy fs-1-1rem fw-600" : "fs-1-0rem"}`}>
                    {item?.titleKo}
                  </Div>
                  <Div className={"ml-2px"}>
                    {selectedTab === item?.titleEn ? (
                      <Icons
                        key={"ChevronUp"}
                        name={"ChevronUp"}
                        className={"w-12px h-12px black"}
                      />
                    ) : (
                      <Icons
                        key={"ChevronDown"}
                        name={"ChevronDown"}
                        className={"w-12px h-12px black"}
                      />
                    )}
                  </Div>
                </Div>
              </ListItem>
              {/* 하위 항목 */}
              <Collapse
                in={selectedTab === item?.titleEn}
                timeout={"auto"}
                unmountOnExit={true}
              >
                <List>
                  {item?.sub.map((subItem, subIdx) => (
                    <ListItem
                      key={subIdx}
                      onClick={() => {
                        if (
                          subItem.titleEn === "dashboard" &&
                          subItem.url === "/admin/dashboard" &&
                          !isAdmin
                        ) {
                          setALERT({
                            open: true,
                            severity: "error",
                            msg: "관리자만 접근 가능합니다."
                          });
                          return;
                        }
                        setSelectedTab(item?.titleEn);
                        setSelectedTabVal(item?.titleEn);
                        setSelectedListItem(subItem.titleEn);
                        navigate(subItem.url, {
                          state: {
                            category: subItem?.category
                          }
                        });
                        toggleSidebar();
                      }}
                    >
                      <Div className={`pointer-burgundy ${selectedTabVal === item?.titleEn && selectedListItem === subItem.titleEn ? "burgundy fs-1-0rem" : "fs-0-9rem"}`}>
                        {subItem.titleKo}
                      </Div>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          ))}
        </Grid>
      </Grid>
    );
    const textSection1 = () => (
      <Grid container={true} spacing={2}>
        <Grid size={12} className={"d-col-left horizontal-text"}>
          <Div className={"d-row-center"}>
            <Icons
              key={"Info"}
              name={"Info"}
              className={"w-12px h-12px"}
            />
            <Div className={"fs-0-7rem"}>
              사업자 등록번호: 883-03-03096
            </Div>
          </Div>
          <Div className={"d-row-center"}>
            <Icons
              key={"Location"}
              name={"Location"}
              className={"w-12px h-12px"}
            />
            <Div className={"fs-0-7rem"}>
              경기 파주시 문산읍 방촌로 1675-34
            </Div>
          </Div>
          <Div className={"d-row-center"}>
            <Icons
              key={"Phone"}
              name={"Phone"}
              className={"w-12px h-12px"}
            />
            <Div className={"fs-0-8rem"}>
              031-952-8083
            </Div>
          </Div>
          <Div className={"d-row-center"}>
            <Icons
              key={"Mail"}
              name={"Mail"}
              className={"w-12px h-12px"}
            />
            <Div className={"fs-0-8rem"}>
              sooookee@naver.com
            </Div>
          </Div>
        </Grid>
      </Grid>
    );
    const textSection2 = () => (
      <Grid container={true} spacing={2}>
        <Grid size={12} className={"d-col-left horizontal-text"}>
          <Div className={"d-row-center"}>
            <Icons
              key={"Copyright"}
              name={"Copyright"}
              className={"w-10px h-10px"}
            />
            <Div className={"fs-0-7rem fw-400 ml-n5"}>
              2024
            </Div>
            <Div className={"fs-0-7rem fw-600 ml-5pxdark"}>
              PajuKaesong
            </Div>
          </Div>
          <Div className={"d-row-center"}>
            <Icons
              key={"Copyright"}
              name={"Copyright"}
              className={"w-10px h-10px"}
            />
            <Div className={"fs-0-7rem fw-400 ml-n5"}>
              Designed by
            </Div>
            <Div className={"fs-0-7rem fw-600 ml-5pxdark"}>
              JUNGHO
            </Div>
          </Div>
          <Div className={"d-row-center"}>
            <Icons
              key={"Copyright"}
              name={"Copyright"}
              className={"w-10px h-10px"}
            />
            <Div className={"fs-0-7rem fw-400 ml-n5"}>
              Version
            </Div>
            <Div className={"fs-0-7rem fw-600 ml-5pxdark"}>
              {appDate}
            </Div>
          </Div>
        </Grid>
      </Grid>
    );
    return (
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: "240px",
            padding: "15px",
            backgroundColor: "#fff",
          },
        }}
      >
        <Grid container={true} spacing={0}>
          <Grid size={12} className={"d-col-center"}>
            {logoSection()}
            <Hr m={40} className={"bg-light-grey"} />
            {sidebarSection()}
            <Hr m={40} className={"bg-light-grey"} />
            {textSection1()}
            <Hr m={40} className={"bg-light-grey"} />
            {textSection2()}
          </Grid>
        </Grid>
      </Drawer>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {sideBarNode()}
    </>
  );
};