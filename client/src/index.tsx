// index.tsx

import "swiper/css";
import "@styles/Swiper.css";
import "@styles/Components.css";
import "@styles/Core.css";
import "@styles/Mui.css";
import "@styles/Jstyle.css";
import "./index.css";

import {
  ReactDOM, BrowserRouter, Routes, Route
} from "@imports/ImportReacts";

import {
  CssBaseline, createTheme, ThemeProvider
} from "@imports/ImportMuis";

import {
  useRoot, useScrollTop, useTimeZone
} from "@imports/ImportHooks";

import {
  Header, Footer
} from "@imports/ImportLayouts";

import {
  Main,
  AboutGreeting, AboutLocation,
  ContactFind, ContactList, ContactDetail, ContactSave,
  FranchiseInfo, FranchiseList, FranchiseSave, FranchiseUpdate,
  MenuListMain, MenuListSide, MenuDetail, MenuSave, MenuUpdate,
  NoticeList, NoticeDetail, NoticeSave, NoticeUpdate,
  OrderBuy, OrderLookup,
  UserLogin, UserSignup,
} from "@imports/ImportPages";


// -------------------------------------------------------------------------------------------------
const About = () => (
  <Routes>
    <Route path={"/greeting"} element={<AboutGreeting />} />
    <Route path={"/location"} element={<AboutLocation />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Contact = () => (
  <Routes>
    <Route path={"/find"} element={<ContactFind />} />
    <Route path={"/list"} element={<ContactList />} />
    <Route path={"/detail"} element={<ContactDetail />} />
    <Route path={"/save"} element={<ContactSave />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Franchise = () => (
  <Routes>
    <Route path={"/info"} element={<FranchiseInfo />} />
    <Route path={"/list"} element={<FranchiseList />} />
    <Route path={"/save"} element={<FranchiseSave />} />
    <Route path={"/update"} element={<FranchiseUpdate />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Menu = () => (
  <Routes>
    <Route path={"/list/main"} element={<MenuListMain />} />
    <Route path={"/list/side"} element={<MenuListSide />} />
    <Route path={"/save"} element={<MenuSave />} />
    <Route path={"/update"} element={<MenuUpdate />} />
    <Route path={"/detail"} element={<MenuDetail />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Notice = () => (
  <Routes>
    <Route path={"/list"} element={<NoticeList />} />
    <Route path={"/detail"} element={<NoticeDetail />} />
    <Route path={"/save"} element={<NoticeSave />} />
    <Route path={"/update"} element={<NoticeUpdate />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Order = () => (
  <Routes>
    <Route path={"/buy"} element={<OrderBuy />} />
    <Route path={"/lookup"} element={<OrderLookup />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const User = () => (
  <Routes>
    <Route path={"/login"} element={<UserLogin />} />
    <Route path={"/signup"} element={<UserSignup />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const App = () => {

  useRoot();
  useTimeZone();
  useScrollTop();

  return (
    <div className={"App"}>
      <Header />
      <Routes>
        <Route path={"/*"} element={<Main />} />
        <Route path={"/about/*"} element={<About />} />
        <Route path={"/contact/*"} element={<Contact />} />
        <Route path={"/franchise/*"} element={<Franchise />} />
        <Route path={"/menu/*"} element={<Menu />} />
        <Route path={"/notice/*"} element={<Notice />} />
        <Route path={"/order/*"} element={<Order />} />
        <Route path={"/user/*"} element={<User />} />
      </Routes>
      <Footer />
    </div>
  );
};

// -------------------------------------------------------------------------------------------------
const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, 'Noto Sans KR', sans-serif",
  },
});

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("root element is null");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter basename={"/PAJUKAESONG"}>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);