// SideBar.tsx

import { useState, useEffect } from "../../imports/ImportReacts.tsx";
import { useCommon } from "../../imports/ImportHooks.tsx";
import { Drawer, List, ListItem, Collapse, Grid } from "../../imports/ImportMuis.tsx";
import { Icons, Div, Img, Hr } from "../../imports/ImportComponents.tsx";
import { logo1 } from "../../imports/ImportImages.tsx";

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
  const { navigate, location, firstStr, secondStr, dataArray } = useCommon();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedListItem, setSelectedListItem] = useState<string>("");

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {
    const index = dataArray.findIndex((item) => (
      item.titleEn === firstStr
    ));
    if (index !== -1) {
      setSelectedTab(firstStr);
      setSelectedTabVal(firstStr);
      setSelectedListItem(secondStr);
    }
  }, [navigate, location]);

  // 7. sidebar ------------------------------------------------------------------------------------
  const sideBarNode = () => {
    const logoSection = () => (
      <Img
        src={logo1}
        className={"pointer h-max50 m-10"}
        onClick={() => {
          navigate("/main");
        }}
      />
    );
    const mainSection = () => (
      dataArray.map((item, idx) => (
        <List
          key={idx}
          component={"nav"}
        >
          {/* 메인 항목 */}
          <ListItem
            onClick={() => {
              if (selectedTab === item.titleEn) {
                setSelectedTab("");
              }
              else {
                setSelectedTab(item.titleEn);
              }
            }}
          >
            <Div className={`pointer-burgundy ${selectedTab === item.titleEn ? "burgundy fs-1-1rem fw-600" : "fs-1-0rem"}`}>
              {item.titleKo}
            </Div>
            {selectedTab === item.titleEn
              ? <Icons name={"TbChevronUp"} className={"w-12 h-12 black"} />
              : <Icons name={"TbChevronDown"} className={"w-12 h-12 black"} />
            }
          </ListItem>
          {/* 하위 항목 */}
          <Collapse
            in={selectedTab === item.titleEn}
            timeout={"auto"}
            unmountOnExit={true}
          >
            <List>
              {item.sub.map((subItem, subIdx) => (
                <ListItem
                  key={subIdx}
                  onClick={() => {
                    setSelectedTab(item.titleEn);
                    setSelectedTabVal(item.titleEn);
                    setSelectedListItem(subItem.titleEn);
                    navigate(subItem.url);
                    toggleSidebar();
                  }}
                >
                  <Div className={`pointer-burgundy ${selectedTabVal === item.titleEn && selectedListItem === subItem.titleEn ? "burgundy fs-1-0rem" : "fs-0-9rem"}`}>
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
      <Grid container columnSpacing={1} rowSpacing={1}>
        <Grid size={12} className={"fs-0-7rem"}>
          이코딩  |  주소: 서울특별시 강남구 역삼동
        </Grid>
        <Grid size={12} className={"fs-0-7rem"}>
          대표: 이코딩  |  사업자: 123-45-67890
        </Grid>
        <Grid size={12} className={"fs-0-7rem"}>
          전화: 02-123-4567
        </Grid>
        <Grid size={12} className={"fs-0-7rem"}>
          이메일: 123123@gmail.com
        </Grid>
      </Grid>
    );
    const textSection2 = () => (
      <Grid container columnSpacing={1} rowSpacing={1}>
        <Grid size={12} className={"fs-0-8rem"}>
          <span>&copy; 2024</span> <b>PajuKaesong</b>
        </Grid>
        <Grid size={12} className={"fs-0-8rem"}>
          <span>Designed by</span> <b>JUNGHO</b>
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
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Grid container columnSpacing={1} rowSpacing={1}>
          <Grid size={12} className={"d-center"}>
            {logoSection()}
          </Grid>
          <Grid size={12}>
            {mainSection()}
          </Grid>
          <Hr px={10} />
          <Grid size={12}>
            {textSection1()}
          </Grid>
          <Hr px={10} />
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