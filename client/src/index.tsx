// index.tsx

import { ReactDOM, BrowserRouter, Routes, Route } from "./import/ImportReacts.tsx";
import { CssBaseline, createTheme, ThemeProvider } from "./import/ImportMuis.tsx";
import { useScrollTop, useEnhancedTouch, useRoot } from "./import/ImportHooks.tsx";
import { useSessionStorage, LanguageProvider } from "./import/ImportHooks.tsx";

import "./assets/css/Mui.css";
import "./assets/css/Components.css";
import "./assets/css/Core.css";
import "./assets/css/Jstyle.css";
import "./index.css";

import { Header } from "./import/ImportLayouts.tsx";
import { Footer } from "./import/ImportLayouts.tsx";

import { MainPage } from "./page/main/Main.tsx";
import { AboutMain } from "./page/about/AboutMain.tsx";
import { AboutGreeting } from "./page/about/AboutGreeting.tsx";
import { AboutHistory } from "./page/about/AboutHistory.tsx";
import { AboutLocation } from "./page/about/AboutLocation.tsx";
import { MenuMain } from "./page/menu/MenuMain.tsx";
import { MenuSide } from "./page/menu/MenuSide.tsx";
import { ProductBuy } from "./page/product/ProductBuy.tsx";
import { ProductOrder } from "./page/product/ProductOrder.tsx";
import { FranchiseBranch } from "./page/franchise/FranchiseBranch.tsx";
import { FranchiseInquiry } from "./page/franchise/FranchiseInquiry.tsx";
import { ContactNotice } from "./page/contact/ContactNotice.tsx";
import { ContactInquiry } from "./page/contact/ContactInquiry.tsx";

// -------------------------------------------------------------------------------------------------
const Main = () => (
  <Routes>
    <Route path="/main" element={<MainPage />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const About = () => (
  <Routes>
    <Route path="/main" element={<AboutMain />} />
    <Route path="/greeting" element={<AboutGreeting />} />
    <Route path="/history" element={<AboutHistory />} />
    <Route path="/location" element={<AboutLocation />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Menu = () => (
  <Routes>
    <Route path="/main" element={<MenuMain />} />
    <Route path="/side" element={<MenuSide />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Product = () => (
  <Routes>
    <Route path="/buy" element={<ProductBuy />} />
    <Route path="/order" element={<ProductOrder />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Franchise = () => (
  <Routes>
    <Route path="/branch" element={<FranchiseBranch />} />
    <Route path="/inquiry" element={<FranchiseInquiry />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Contact = () => (
  <Routes>
    <Route path="/notice" element={<ContactNotice />} />
    <Route path="/inquiry" element={<ContactInquiry />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const App = () => {

  useRoot();
  useSessionStorage();
  useScrollTop();
  useEnhancedTouch();

  return (
    <div className={"App"}>
      <Header />
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/menu/*" element={<Menu />} />
        <Route path="/product/*" element={<Product />} />
        <Route path="/franchise/*" element={<Franchise />} />
        <Route path="/contact/*" element={<Contact />} />
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
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </BrowserRouter>
);