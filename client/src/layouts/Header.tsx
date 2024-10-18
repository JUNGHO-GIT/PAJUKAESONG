// Header.tsx

import { useState, useEffect } from "@imports/ImportReacts";
import { useCommonValue, useResponsive } from "@imports/ImportHooks";
import { Div, Img, Icons } from "@imports/ImportComponents";
import { Paper, Grid } from "@imports/ImportMuis";
import { Tabs, Tab, Menu, MenuItem, tabsClasses } from "@imports/ImportMuis";
import { SideBar } from '@imports/ImportLayouts';

// -------------------------------------------------------------------------------------------------
export const Header = () => {

  // 1. common -------------------------------------------------------------------------------------
  const { navigate, PATH, firstStr, secondStr } = useCommonValue();
  const { dataArray, isAdmin, location_category } = useCommonValue();
  const { isXxs, isXs, isSm, isMd, isLg, isXl } = useResponsive();

  // 2-2. useState ---------------------------------------------------------------------------------
  const [tabWidth, setTabWidth] = useState<string>("");
  const [tabHeight, setTabHeight] = useState<string>("");
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [selectedTabVal, setSelectedTabVal] = useState<string>("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
  const [selectedAnchorEl, setSelectedAnchorEl] = useState<Record<string, HTMLElement | null>>({});

  // 2-3. useEffect --------------------------------------------------------------------------------
  useEffect(() => {
    if (isXxs) {
      setTabWidth("");
      setTabHeight("h-10vh");
    }
    else if (isXs) {
      setTabWidth("");
      setTabHeight("h-10vh");
    }
    else if (isSm) {
      setTabWidth("w-17p");
      setTabHeight("h-20vh");
    }
    else if (isMd) {
      setTabWidth("w-17p");
      setTabHeight("h-15vh");
    }
    else if (isLg) {
      setTabWidth("w-17p");
      setTabHeight("h-15vh");
    }
    else if (isXl) {
      setTabWidth("w-17p");
      setTabHeight("h-15vh");
    }
  }, [isXxs, isXs, isSm, isMd, isLg, isXl]);

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
      <Grid container spacing={0} columns={12}>
        <Grid size={12} className={"d-center"}>
          <Icons
            name={"Hamburger"}
            className={"w-24 h-24 black"}
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
      <Grid container spacing={0} columns={12}>
        <Grid size={12} className={isSm ? "d-row-center" : "d-row-left"}>
          <Img
            max={isXxs ? 150 : 200}
            hover={false}
            shadow={false}
            radius={false}
            group={"main"}
            src={"logo1.webp"}
            className={"w-80p"}
            onClick={() => {
              navigate("/main");
            }}
          />
          {isAdmin && (
            <Div
              className={"pointer-burgundy burgundy fs-0-8rem fw-700"}
              onClick={() => {
                navigate("/admin/dashboard");
              }}
            >
              관리자
            </Div>
          )}
        </Grid>
      </Grid>
    );
    const tabsSection = () => (
      <Grid container spacing={0} columns={12}>
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
                className={`pointer-burgundy fs-1-1rem horizontal-text ${tabWidth} ${selectedTab === item?.titleEn ? "burgundy fw-600" : ""}`}
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
                className: "py-0 px-5",
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
                className={`pointer-burgundy fs-1-1rem p-20 ${selectedTabVal === selectedTab && selectedMenuItem === subItem.titleEn ? "burgundy fw-600" : ""}`}
                onClick={() => {
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
      <Paper className={`layout-wrapper bg-ivory-light p-sticky top-0vh border-bottom-1 shadow-bottom-4 p-20 ${tabHeight}`}>
        <Grid container spacing={2} columns={12}>
          <Grid
            size={isXxs ? 2 : isXs ? 2 : isSm ? 0 : isMd ? 0 : isLg ? 0 : isXl ? 0 : 0}
            className={`${(isXxs || isXs) ? "d-row-left" : "d-none"}`}
          >
            {sidebarSection()}
          </Grid>
          <Grid
            size={isXxs ? 10 : isXs ? 10 : isSm ? 12 : isMd ? 4 : isLg ? 4 : isXl ? 4 : 4}
            className={`${(isXxs || isXs) ? "d-row-left" : "d-center"}`}
          >
            {logoSection()}
          </Grid>
          <Grid
            size={isXxs ? 0 : isXs ? 0 : isSm ? 12 : isMd ? 8 : isLg ? 8 : isXl ? 8 : 8}
            className={`${(isXxs || isXs) ? "d-none" : "d-row-center"}`}
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
