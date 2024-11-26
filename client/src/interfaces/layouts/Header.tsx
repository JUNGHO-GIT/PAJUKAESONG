// Header.tsx

import { useState, useEffect } from "@importReacts";
import { useCommonValue, useResponsive } from "@importHooks";
import { SideBar } from '@importLayouts';
import { Div, Img, Icons, Paper, Grid } from "@importComponents";
import { Tabs, Tab, Menu, MenuItem, tabsClasses } from "@importMuis";

// -------------------------------------------------------------------------------------------------
export const Header = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, PATH, firstStr, secondStr } = useCommonValue();
  const { dataArray, isAdmin, location_category } = useCommonValue();
  const { xxs, xs, sm, md, lg, xl, isXxl } = useResponsive();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [tabHeight, setTabHeight] = useState<string>("");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
  const [selectedAnchorEl, setSelectedAnchorEl] = useState<Record<string, HTMLElement | null>>({});

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (xxs) {
      setTabHeight("h-10vh");
    }
    else if (xs) {
      setTabHeight("h-10vh");
    }
    else if (sm) {
      setTabHeight("h-20vh");
    }
    else if (md) {
      setTabHeight("h-15vh");
    }
    else if (lg) {
      setTabHeight("h-15vh");
    }
    else if (xl) {
      setTabHeight("h-15vh");
    }
    else if (isXxl) {
      setTabHeight("h-15vh");
    }
  }, [xxs, xs, sm, md, lg, xl, isXxl]);

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {

    // menu인 경우
    if (firstStr === "menu") {
      setSelectedTab(firstStr);
      setSelectedTabVal(firstStr);
      setSelectedMenuItem(location_category);
    }

    // product인 경우
    else if (firstStr === "product") {
      setSelectedTab("order");
      setSelectedTabVal("order");
      setSelectedMenuItem(secondStr);
    }

    // 나머지 경우
    else {
      dataArray.forEach((item) => {
        if (item?.titleEn === firstStr) {
          setSelectedTab(firstStr);
          setSelectedTabVal(firstStr);
          setSelectedMenuItem(secondStr);
        }
      });
    }
  }, [PATH]);

  // 2. toggle -------------------------------------------------------------------------------------
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // 7. headerNode ---------------------------------------------------------------------------------
  const headerNode = () => {
    const sidebarSection = () => (
      <Grid container={true} spacing={0}>
        <Grid size={12} className={"d-center"}>
          <Icons
            name={"Hamburger"}
            className={"w-24px h-24px black"}
            onClick={() => toggleSidebar()}
          />
          <SideBar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </Grid>
      </Grid>
    );
    const logoSection = () => (
      <Grid container={true} spacing={0}>
        <Grid size={12} className={sm ? "d-row-center" : "d-row-left"}>
          <Img
            max={xxs ? 150 : 200}
            hover={false}
            shadow={false}
            radius={false}
            group={"main"}
            src={"logo1_1.webp"}
            className={"w-80p"}
            onClick={() => {
              navigate("/main");
            }}
          />
          {isAdmin && (
            <Div className={"pointer-burgundy burgundy fs-0-8rem fw-700"}>
              관리자
            </Div>
          )}
        </Grid>
      </Grid>
    );
    const tabsSection = () => (
      <Grid container={true} spacing={0}>
        <Grid size={12} className={"d-center"}>
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
                label={item?.titleKo}
                value={item?.titleEn}
                className={`pointer-burgundy fs-1-1rem horizontal mx-auto ${selectedTab === item?.titleEn ? "burgundy fw-600" : ""}`}
                onClick={(e) => {
                  setSelectedTab(item?.titleEn);
                  setSelectedAnchorEl({
                    [item?.titleEn]: e.currentTarget,
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
                className: "py-0px px-5px",
              }
            }}
            onClose={() => {
              setSelectedAnchorEl((prev) => ({
                ...prev,
                [selectedTab]: null,
              }));
            }}
          >
            {dataArray.find((item) => item?.titleEn === selectedTab)?.sub.map((subItem, subIdx) => (
              <MenuItem
                key={`menuItem-${subIdx}`}
                selected={selectedMenuItem === subItem.titleEn}
                className={`pointer-burgundy fs-1-1rem p-20px ${selectedTabVal === selectedTab && selectedMenuItem === subItem.titleEn ? "burgundy fw-600" : ""}`}
                disabled={subItem?.titleEn === "dashboard" && !isAdmin}
                onClick={() => {
                  if (subItem?.titleEn === "dashboard" && !isAdmin) {
                    return;
                  }
                  setSelectedTabVal(selectedTab);
                  setSelectedMenuItem(subItem.titleEn);
                  setSelectedAnchorEl((prev) => ({
                    ...prev,
                    [selectedTab]: null,
                  }));
                  navigate(subItem.url, {
                    state: {
                      category: subItem?.category
                    }
                  });
                }}
              >
                {subItem.titleKo}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
    );
    return (
      <Paper className={`layout-wrapper p-sticky top-0vh border-bottom-1 shadow-bottom-4 radius-0 p-20px ${tabHeight}`}>
        <Grid container={true} spacing={2}>
          <Grid
            size={xxs ? 2 : xs ? 2 : sm ? 0 : md ? 0 : lg ? 0 : xl ? 0 : 0}
            className={`${(xxs || xs) ? "d-row-left" : "d-none"}`}
          >
            {sidebarSection()}
          </Grid>
          <Grid
            size={xxs ? 10 : xs ? 10 : sm ? 12 : md ? 2 : lg ? 2 : xl ? 2 : 2}
            className={`${(xxs || xs) ? "d-row-left" : "d-center"}`}
          >
            {logoSection()}
          </Grid>
          <Grid
            size={xxs ? 0 : xs ? 0 : sm ? 12 : md ? 10 : lg ? 10 : xl ? 10 : 10}
            className={`${(xxs || xs) ? "d-none" : "d-row-center"}`}
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
