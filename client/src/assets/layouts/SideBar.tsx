// SideBar.tsx

import { useState, useEffect } from "../../import/ImportReacts.tsx";
import { useNavigate, useLocation } from "../../import/ImportReacts.tsx";
import { Drawer, List, ListItem, Collapse } from "../../import/ImportMuis.tsx";
import { Icons, Div } from "../../import/ImportComponents.tsx";
import { dataArray } from "../../import/ImportUtils.tsx";

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
  const navigate = useNavigate();
  const location = useLocation();
  const PATH = location?.pathname;
  const firstStr = PATH?.split("/")[1] || "";
  const secondStr = PATH?.split("/")[2] || "";

  // 2-2. useState ---------------------------------------------------------------------------------
  const [selectedTab, setSelectedTab] = useState<string>(firstStr);
  const [selectedListItem, setSelectedListItem] = useState<string>(secondStr);

  // 2-3. useEffect --------------------------------------------------------------------------------
  // 페이지 변경시 초기화
  useEffect(() => {
    const index = dataArray.findIndex((item) => (
      item.title === firstStr
    ));
    if (index !== -1) {
      setSelectedTab(firstStr);
      setSelectedListItem(secondStr);
    }
  }, [PATH]);

  // 10. return ------------------------------------------------------------------------------------
  return (
    <Drawer
      anchor={"left"}
      open={isOpen}
      onClose={toggleSidebar}
    >
      {dataArray.map((item, idx) => (
        <List
          key={idx}
          component={"nav"}
          className={"w-240"}
        >
          {/* 메인 항목 */}
          <ListItem
            className={`pointer ${selectedTab === item.title ? "bg-grey" : ""}`}
            onClick={() => {
              if (selectedTab === item.title) {
                setSelectedTab("");
              }
              else {
                setSelectedTab(item.title);
              }
            }}
          >
            <Div className={"fs-1-2rem black"}>
              {item.title}
            </Div>
            {selectedTab === item.title
              ? <Icons name={"TbChevronUp"} className={"w-12 h-12 black"} />
              : <Icons name={"TbChevronDown"} className={"w-12 h-12 black"} />
            }
          </ListItem>
          {/* 하위 항목 */}
          <Collapse
            in={selectedTab === item.title}
            timeout={"auto"}
            unmountOnExit={true}
          >
            <List>
              {item.sub.map((subItem, subIdx) => (
                <ListItem
                  key={subIdx}
                  className={
                    `pointer ${selectedTab === item.title && selectedListItem === subItem.title ? "bg-grey" : ""}`
                  }
                  onClick={() => {
                    setSelectedTab(item.title);
                    setSelectedListItem(subItem.title);
                    toggleSidebar();
                    navigate(subItem.url);
                  }}
                >
                  <Div className={"fs-1-0rem dark"}>
                    {subItem.title}
                  </Div>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      ))}
    </Drawer>
  );
};