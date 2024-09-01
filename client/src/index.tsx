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
  ProductBuy, ProductOrder,
  FranchiseBranch, FranchiseInquiry,
  ContactNotice, ContactInquiry,
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
    <Route path={"/buy"} element={<ProductBuy />} />
    <Route path={"/order"} element={<ProductOrder />} />
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
    <Route path={"/notice"} element={<ContactNotice />} />
    <Route path={"/inquiry"} element={<ContactInquiry />} />
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