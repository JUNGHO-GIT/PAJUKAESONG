// Header.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommon, useResponsive } from "@imports/ImportHooks";
import { Div, Img, Icons } from "@imports/ImportComponents";
import { Paper, Grid } from "@imports/ImportMuis";
import { Tabs, Tab, Card, Menu, MenuItem, tabsClasses } from "@imports/ImportMuis";
import { SideBar } from '@imports/ImportLayouts';
import { logo1 } from "@imports/ImportImages";

// -------------------------------------------------------------------------------------------------
export const Header = () => {

  // 1. common -------------------------------------------------------------------------------------
  const {
    isXs, isSm, isMd, isLg, isXl
  } = useResponsive();
  const {
    navigate, PATH, firstStr, secondStr, dataArray, isAdmin,
  } = useCommon();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [tabWidth, setTabWidth] = useState<string>("");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
  const [selectedAnchorEl, setSelectedAnchorEl] = useState<Record<string, HTMLElement | null>>({});

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXs) {
      setTabWidth("");
    }
    else if (isSm || isMd || isLg || isXl) {
      setTabWidth("w-17p");
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {
    const index = dataArray.findIndex((item) => (
      item.titleEn === firstStr
    ));
    if (firstStr === "main") {
      setSelectedTab("");
      setSelectedTabVal("");
      setSelectedMenuItem("");
    }
    if (index !== -1) {
      setSelectedTab(firstStr);
      setSelectedTabVal(firstStr);
      setSelectedMenuItem(secondStr);
    }
  }, [PATH]);

  // 2. toggle -------------------------------------------------------------------------------------
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // 7. headerNode ---------------------------------------------------------------------------------
  const headerNode = () => {
    const toggleSection = () => (
      <Icons
        name={"Hamburger"}
        className={"w-24 h-24 black"}
        onClick={() => toggleSidebar()}
      />
    );
    const sidebarSection = () => (
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    );
    const logoSection = () => (
      <Div className={"d-center"}>
        <Img
          src={logo1}
          className={"pointer h-max50"}
          onClick={() => {
            navigate("/main");
          }}
        />
        <Div className={"fs-0-9rem fw-600 burgundy"}>
          {isAdmin ? "관리자" : ""}
        </Div>
      </Div>
    );
    const tabsSection = () => (
      <>
        <Tabs
          value={selectedTab || false}
          variant={"scrollable"}
          selectionFollowsFocus={true}
          scrollButtons={false}
          className={`w-100p`}
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
            "& .MuiTab-root": {
              color: "black",
            },
            "& .MuiTabs-flexContainer": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          {dataArray.map((item, idx) => (
            <Tab
              key={`tab-${idx}`}
              label={item.titleKo}
              value={item.titleEn}
              className={`pointer-burgundy fs-1-1rem horizon-text ${tabWidth} ${selectedTab === item.titleEn ? "burgundy fw-600" : ""}`}
              onClick={(e) => {
                setSelectedTab(item.titleEn);
                setSelectedAnchorEl({
                  [item.titleEn]: e.currentTarget,
                });
              }}
            />
          ))}
        </Tabs>
        <Menu
          anchorEl={selectedAnchorEl[selectedTab]}
          open={Boolean(selectedAnchorEl[selectedTab])}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          slotProps={{
            paper: {
              style: {
                padding: "0px 5px",
              }
            }
          }}
          onClose={() => {
            setSelectedAnchorEl((prev) => ({
              ...prev,
              [selectedTab]: null,
            }));
          }}
        >
          {dataArray.find((item) => item.titleEn === selectedTab)?.sub.map((subItem, subIdx) => (
            <MenuItem
              key={`menuItem-${subIdx}`}
              selected={selectedMenuItem === subItem.titleEn}
              className={`pointer-burgundy fs-1-1rem p-20 ${selectedTabVal === selectedTab && selectedMenuItem === subItem.titleEn ? "burgundy fw-600" : ""}`}
              onClick={() => {
                setSelectedTabVal(selectedTab);
                setSelectedMenuItem(subItem.titleEn);
                navigate(subItem.url);
                setSelectedAnchorEl((prev) => ({
                  ...prev,
                  [selectedTab]: null,
                }));
              }}
            >
              {subItem.titleKo}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
    return (
      <Paper className={"layout-wrapper p-sticky top-0vh border-bottom p-20"}>
        <Grid container spacing={1}>
          <Grid
            size={{ xs: 2, sm: 0, md: 0 }}
            className={`${isXs ? "d-left" : "d-none"}`}
          >
            {sidebarSection()}
            {toggleSection()}
          </Grid>
          <Grid
            size={{ xs: 10, sm: 12, md: 4 }}
            className={`${isXs ? "d-left" : "d-center"}`}
          >
            {logoSection()}
          </Grid>
          <Grid
            size={{ xs: 0, sm: 12, md: 8 }}
            className={`${isXs ? "d-none" : "d-center"}`}
          >
            {tabsSection()}
          </Grid>
        </Grid>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {headerNode()}
    </>
  );
};
