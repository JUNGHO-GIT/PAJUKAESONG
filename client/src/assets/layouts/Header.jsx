// Header.jsx

import {React, useNavigate, useLocation} from "../../import/ImportReacts.jsx";
import {Div, Img, Icons} from "../../import/ImportComponents.jsx";
import {axios, numeral, moment} from "../../import/ImportLibs.jsx";
import {Paper, Card, Grid} from "../../import/ImportMuis.jsx";
import {logo2, logo3} from "../../import/ImportImages.jsx";

// -------------------------------------------------------------------------------------------------
export const Header = () => {

  // 1. common -------------------------------------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const PATH = location.pathname;
  const firstStr = PATH?.split("/")[1] || "";

  // 6-2. button -----------------------------------------------------------------------------------
  const btnUser = () => (
    firstStr !== "user" ? (
      <Icons name={"TbSettings"} className={"w-24 h-24 black m-0"} onClick={() => {
        navigate("/user/app/setting");
      }}/>
    ) : (
      <Icons name={"TbArrowRight"} className={"w-24 h-24 black m-0"} onClick={() => {
        navigate(-1);
      }}/>
    )
  );

  // 6. default ------------------------------------------------------------------------------------
  const defaultNode = () => (
    <Div className={"d-between w-100p"}>
      <Div className={"d-center"}>
        <Img
          src={logo2}
          className={"h-max30"}
          onClick={(e) => {
            navigate("/today/list", {
              state: {
                dateType: "day",
                dateStart: moment.tz("Asia/Seoul").format("YYYY-MM-DD"),
                dateEnd: moment.tz("Asia/Seoul").format("YYYY-MM-DD"),
              }
            });
          }}
        />
        <Img src={logo3} className={"h-max30"} />
      </Div>
      <Div className={"d-center ms-auto"}>
        {btnUser()}
      </Div>
    </Div>
  );

  // 7. header -------------------------------------------------------------------------------------
  const navbarNode = () => (
    <Paper className={"flex-wrapper p-sticky top-0vh radius border shadow-none"}>
      <Card className={"block-wrapper d-row h-8vh w-100p shadow-none"}>
        {defaultNode()}
      </Card>
    </Paper>
  );

  // 10. return ------------------------------------------------------------------------------------
  return (
    <>
    {navbarNode()}
    </>
  );
};