// SideBar.tsx

import { useState, useEffect } from "../../import/ImportReacts.tsx";
import { useCommon } from "../../import/ImportHooks.tsx";
import { Drawer, List, ListItem, Collapse } from "../../import/ImportMuis.tsx";
import { Icons, Div, Img, Br5, Hr30, Hr50 } from "../../import/ImportComponents.tsx";
import { logo1 } from "../../import/ImportImages.tsx";

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
    const textSection = () => (
      <Div className={"w-100p mb-20"}>
        <Div className={"d-center"}>
          <Div className={"fs-0-8rem me-10"}>
            &copy; Copyright
          </Div>
          <Div className={"fs-0-9rem fw-700"}>
            PajuKaesong
          </Div>
        </Div>
        <Br5 />
        <Div className={"d-center"}>
          <Div className={"fs-0-8rem me-10"}>
            Designed by
          </Div>
          <Div className={"fs-0-9rem fw-700"}>
            JUNGHO
          </Div>
        </Div>
      </Div>
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
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        {logoSection()}
        <Hr30 />
        {mainSection()}
        <Hr50 />
        {textSection()}
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