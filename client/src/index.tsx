// index.tsx

import "swiper/css";
import "@styles/Swiper.css";
import "@styles/Mui.css";
import "@styles/Components.css";
import "@styles/Core.css";
import "@styles/Jstyle.css";
import "./index.css";

import {
  ReactDOM, BrowserRouter, Routes, Route
} from "@imports/ImportReacts";

import {
  CssBaseline, createTheme, ThemeProvider
} from "@imports/ImportMuis";

import {
  useRoot, useScrollTop,
} from "@imports/ImportHooks";

import {
  Header, Footer
} from "@imports/ImportLayouts";

import {
  CommonMain,
  AboutMain, AboutGreeting, AboutLocation,
  MenuMain, MenuSide,
  ProductOrder, ProductLookup,
  FranchiseBranch, FranchiseInquiry,
  ContactInquiry, ContactLookup,
  NoticeList, NoticeDetail,
} from "@imports/ImportPages";

// -------------------------------------------------------------------------------------------------
const Common = () => (
  <Routes>
    <Route path={"/main"} element={<CommonMain />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const About = () => (
  <Routes>
    <Route path={"/main"} element={<AboutMain />} />
    <Route path={"/greeting"} element={<AboutGreeting />} />
    <Route path={"/location"} element={<AboutLocation />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Menu = () => (
  <Routes>
    <Route path={"/main"} element={<MenuMain />} />
    <Route path={"/side"} element={<MenuSide />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Product = () => (
  <Routes>
    <Route path={"/order"} element={<ProductOrder />} />
    <Route path={"/lookup"} element={<ProductLookup />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Franchise = () => (
  <Routes>
    <Route path={"/branch"} element={<FranchiseBranch />} />
    <Route path={"/inquiry"} element={<FranchiseInquiry />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Contact = () => (
  <Routes>
    <Route path={"/inquiry"} element={<ContactInquiry />} />
    <Route path={"/lookup"} element={<ContactLookup />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Notice = () => (
  <Routes>
    <Route path={"/list"} element={<NoticeList />} />
    <Route path={"/detail"} element={<NoticeDetail />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const App = () => {

  useRoot();
  useScrollTop();

  return (
    <div className={"App"}>
      <Header />
      <Routes>
        <Route path={"/*"} element={<Common />} />
        <Route path={"/about/*"} element={<About />} />
        <Route path={"/menu/*"} element={<Menu />} />
        <Route path={"/product/*"} element={<Product />} />
        <Route path={"/franchise/*"} element={<Franchise />} />
        <Route path={"/contact/*"} element={<Contact />} />
        <Route path={"/notice/*"} element={<Notice />} />
      </Routes>
      <Footer />
    </div>
  );
};

// -------------------------------------------------------------------------------------------------
const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif',
  },
});

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("root element is null");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter basename={"/PAJUKAESONG"}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);