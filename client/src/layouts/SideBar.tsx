// SideBar.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue } from "@imports/ImportHooks";
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
  const {
    navigate, firstStr, secondStr, dataArray, PATH, location_category
  } = useCommonValue();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedListItem, setSelectedListItem] = useState<string>("");

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
        group={"main"}
        src={"logo1.webp"}
        className={"pointer m-10 h-max50"}
        onClick={() => {
          navigate("/main");
        }}
      />
    );
    // 2. sidebar
    const mainSection = () => (
      dataArray.map((item, idx) => (
        <List
          key={idx}
          component={"nav"}
        >
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
      ))
    );
    const textSection1 = () => (
      <Grid container spacing={2} columns={12} className={`d-center horizontal-text`}>
        <Grid size={12} className={"d-row-left"}>
          <Icons
            key={"Info"}
            name={"Info"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-7rem"}>
            사업자 등록번호: 883-03-03096
          </Div>
        </Grid>
        <Grid size={12} className={"d-row-left"}>
          <Icons
            key={"Location"}
            name={"Location"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-7rem"}>
            경기 파주시 문산읍 방촌로 1675-34
          </Div>
        </Grid>
        <Grid size={12} className={"d-row-left"}>
          <Icons
            key={"Phone"}
            name={"Phone"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            031-952-8083
          </Div>
        </Grid>
        <Grid size={12} className={"d-row-left"}>
          <Icons
            key={"Mail"}
            name={"Mail"}
            className={"w-12 h-12"}
          />
          <Div className={"fs-0-8rem"}>
            sooookee@naver.com
          </Div>
        </Grid>
      </Grid>
    );
    const textSection2 = () => (
      <Grid container spacing={2} columns={12} className={"horizontal-text fs-0-8rem"}>
        <Grid size={12} className={"d-center"}>
          <span>&copy; 2024&nbsp;&nbsp;</span>
          <b>PajuKaesong</b>
        </Grid>
        <Grid size={12} className={"d-center"}>
          <span>Designed by&nbsp;&nbsp;</span>
          <b>JUNGHO</b>
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
        <Grid container spacing={2} columns={12}>
          <Grid size={12} className={"d-center"}>
            {logoSection()}
          </Grid>
          <Hr px={1} className={"bg-light-grey"} />
          <Grid size={12}>
            {mainSection()}
          </Grid>
          <Hr px={10} className={"bg-light-grey"} />
          <Grid size={12}>
            {textSection1()}
          </Grid>
          <Hr px={10} className={"bg-light-grey"} />
          <Grid size={12}>
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