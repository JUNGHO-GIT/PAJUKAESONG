// SideBar.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
import { axios } from "@imports/ImportUtils";
import { Icons, Div, Img, Hr, Br } from "@imports/ImportComponents";
import { Drawer, List, ListItem, Collapse, Grid } from "@imports/ImportMuis";

// -------------------------------------------------------------------------------------------------
interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// -------------------------------------------------------------------------------------------------
export const SideBar = (
  { isOpen, toggleSidebar }: SideBarProps
) => {

  // 1. common -------------------------------------------------------------------------------------
  const { URL, PATH, navigate, location_category } = useCommonValue();
  const { firstStr, secondStr, dataArray } = useCommonValue();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [appVersion, setAppVersion] = useState<string>("");
  const [appDate, setAppDate] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedListItem, setSelectedListItem] = useState<string>("");

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    axios.get(`${URL}/api/admin/appInfo`)
    .then((res: any) => {
      setAppVersion(res.data.result.version);
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
      <Img
        hover={false}
        shadow={false}
        radius={false}
        group={"main"}
        src={"logo1.webp"}
        className={"pointer m-10 h-max50"}
        onClick={() => {
          navigate("/main");
        }}
      />
    );
    // 2. sidebar
    const sidebarSection = () => (
      <Div className={"w-100p d-column-left"}>
        {dataArray.map((item, idx) => (
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
                <Div className={"ms-2"}>
                  {selectedTab === item?.titleEn ? (
                    <Icons
                      key={"ChevronUp"}
                      name={"ChevronUp"}
                      className={"w-12 h-12 black"}
                    />
                  ) : (
                    <Icons
                      key={"ChevronDown"}
                      name={"ChevronDown"}
                      className={"w-12 h-12 black"}
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
      </Div>
    );
    const textSection1 = () => (
      <Grid container spacing={1} columns={12} className={`d-center horizontal-text`}>
        <Grid size={12} className={"d-column-left"}>
          <Div className={"d-row-center"}>
            <Icons
              key={"Info"}
              name={"Info"}
              className={"w-12 h-12"}
            />
            <Div className={"fs-0-7rem"}>
              사업자 등록번호: 883-03-03096
            </Div>
          </Div>
          <Div className={"d-row-center"}>
            <Icons
              key={"Location"}
              name={"Location"}
              className={"w-12 h-12"}
            />
            <Div className={"fs-0-7rem"}>
              경기 파주시 문산읍 방촌로 1675-34
            </Div>
          </Div>
          <Div className={"d-row-center"}>
            <Icons
              key={"Phone"}
              name={"Phone"}
              className={"w-12 h-12"}
            />
            <Div className={"fs-0-8rem"}>
              031-952-8083
            </Div>
          </Div>
          <Div className={"d-row-center"}>
            <Icons
              key={"Mail"}
              name={"Mail"}
              className={"w-12 h-12"}
            />
            <Div className={"fs-0-8rem"}>
              sooookee@naver.com
            </Div>
          </Div>
        </Grid>
      </Grid>
    );
    const textSection2 = () => (
      <Grid container spacing={1} columns={12} className={"horizontal-text fs-0-8rem"}>
        <Grid size={12} className={"d-row-center"}>
          <span>&copy; 2024&nbsp;&nbsp;</span>
          <b>PajuKaesong</b>
        </Grid>
        <Grid size={12} className={"d-row-center"}>
          <span>&copy; Designed by&nbsp;&nbsp;</span>
          <b>JUNGHO</b>
        </Grid>
        <Grid size={12} className={"d-row-center"}>
          <span>&copy; Version&nbsp;&nbsp;</span>
          <b className={"fs-0-6rem"}>{appVersion} / {appDate}</b>
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
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Grid container spacing={0} columns={12}>
          <Grid size={12}>
            {logoSection()}
            <Hr px={40} className={"bg-light-grey"} />
            {sidebarSection()}
            <Hr px={50} className={"bg-light-grey"} />
            {textSection1()}
            <Hr px={50} className={"bg-light-grey"} />
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