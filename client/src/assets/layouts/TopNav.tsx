// TopNav.tsx

import { React, useState, useEffect } from "../../import/ImportReacts.tsx";
import { useNavigate, useLocation } from "../../import/ImportReacts.tsx";
import { Tabs, Tab, Grid, Paper } from "../../import/ImportMuis.tsx";
import { Card, Menu, MenuItem, tabsClasses } from "../../import/ImportMuis.tsx";
import { Div, Img } from "../../import/ImportComponents.tsx";
import { dataArray, log } from "../../import/ImportUtils.tsx";
import { logo2, logo3 } from "../../import/ImportImages.tsx";

// -------------------------------------------------------------------------------------------------
export const TopNav = () => {

  // 1. common -------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const PATH = location?.pathname;
  const firstStr = PATH?.split("/")[1] || "";
  const upperStr = firstStr.charAt(0).toUpperCase() + firstStr.slice(1);

  // 2-2. useState ---------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState<string>(upperStr);
  const [selectedMenuItems, setSelectedMenuItems] = useState<Record<string, string>>({});
  const [selectedAnchorEl, setSelectedAnchorEl] = useState<Record<string, HTMLElement | null>>({});

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {
    if (!dataArray.some((item) => item.title.toLowerCase() === firstStr.toLowerCase())) {
      setSelectedTab("");
    }
    else {
      setSelectedTab(upperStr);
    }
  }, [PATH]);

  // 7. topNav -------------------------------------------------------------------------------------
  const topNavNode = () => {
    // 1. logo
    const logoFragment = () => (
      <Div className={"d-center"}>
        <Img
          src={logo2}
          className={"h-max30"}
          onClick={() => {
            navigate("/");
          }}
        />
        <Img src={logo3} className={"h-max30"} />
      </Div>
    );
    // 2. tabs
    const tabsFragment = () => (
      dataArray.map((item, idx) => (
        <>
          <Tabs
            key={idx}
            value={selectedTab}
            variant={"scrollable"}
            selectionFollowsFocus={true}
            scrollButtons={false}
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
            onChange={(event, newValue) => {
            }}
          >
            <Tab
              label={item.title}
              value={item.title}
              onClick={(e) => {
                setSelectedAnchorEl((prev) => ({
                  ...prev,
                  [item.title]: e.currentTarget,
                }));
              }}
            />
          </Tabs>
          <Menu
            anchorEl={selectedAnchorEl[item.title]}
            open={Boolean(selectedAnchorEl[item.title])}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            onClose={() => {
              setSelectedAnchorEl((prev) => ({
                ...prev,
                [item.title]: null,
              }));
            }}
          >
            {item.sub.map((subItem, subIdx) => (
              <MenuItem
                key={subIdx}
                selected={selectedMenuItems[item.title] === subItem.title}
                onClick={() => {
                  setSelectedAnchorEl((prev) => ({
                    ...prev,
                    [item.title]: null,
                  }));
                  setSelectedTab(item.title);
                  setSelectedMenuItems((prev) => ({
                    ...prev,
                    [item.title]: subItem.title,
                  }));
                  navigate(subItem.url);
                }}
              >
                {subItem.title}
              </MenuItem>
            ))}
          </Menu>
        </>
      ))
    );

    return (
      <Paper className={"flex-wrapper p-sticky top-0vh radius border shadow-none"}>
        <Card className={"block-wrapper d-row h-8vh w-100p shadow-none"}>
          <Grid container>
            <Grid item xs={2} className={"d-left"}>
              {logoFragment()}
            </Grid>
            <Grid item xs={8} className={"d-center"}>
              {tabsFragment()}
            </Grid>
            <Grid item xs={2} className={"d-right"}>
            </Grid>
          </Grid>
        </Card>
      </Paper>
    );
  };

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
      {topNavNode()}
    </>
  );
};
