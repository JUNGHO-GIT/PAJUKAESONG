// index.tsx

import { ReactDOM, BrowserRouter, Routes, Route } from "./imports/ImportReacts.tsx";
import { CssBaseline, createTheme, ThemeProvider } from "./imports/ImportMuis.tsx";
import { useScrollTop, useEnhancedTouch } from "./imports/ImportHooks.tsx";
import { useRoot } from "./imports/ImportHooks.tsx";

import "swiper/css";
import "./assets/styles/Swiper.css";
import "./assets/styles/Mui.css";
import "./assets/styles/Components.css";
import "./assets/styles/Core.css";
import "./assets/styles/Jstyle.css";
import "./index.css";

import { Header } from "./imports/ImportLayouts.tsx";
import { Footer } from "./imports/ImportLayouts.tsx";

import { CommonMain } from "./pages/common/CommonMain.tsx";
import { AboutMain } from "./pages/about/AboutMain.tsx";
import { AboutGreeting } from "./pages/about/AboutGreeting.tsx";
import { AboutHistory } from "./pages/about/AboutHistory.tsx";
import { AboutLocation } from "./pages/about/AboutLocation.tsx";
import { MenuMain } from "./pages/menu/MenuMain.tsx";
import { MenuSide } from "./pages/menu/MenuSide.tsx";
import { ProductBuy } from "./pages/product/ProductBuy.tsx";
import { ProductOrder } from "./pages/product/ProductOrder.tsx";
import { FranchiseBranch } from "./pages/franchise/FranchiseBranch.tsx";
import { FranchiseInquiry } from "./pages/franchise/FranchiseInquiry.tsx";
import { ContactNotice } from "./pages/contact/ContactNotice.tsx";
import { ContactInquiry } from "./pages/contact/ContactInquiry.tsx";

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
    <Route path={"/history"} element={<AboutHistory />} />
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
  useEnhancedTouch();

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