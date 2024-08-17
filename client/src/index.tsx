// index.tsx

import { ReactDOM, BrowserRouter, Routes, Route } from "./import/ImportReacts.tsx";
import { CssBaseline } from "./import/ImportMuis.tsx";
import { useScrollTop, useEnhancedTouch, useRoot } from "./import/ImportHooks.tsx";
import { useSessionStorage, LanguageProvider } from "./import/ImportHooks.tsx";

import "./index.css";
import "./assets/css/Calendar.css";
import "./assets/css/Chart.css";
import "./assets/css/Mui.css";
import "./assets/css/Components.css";
import "./assets/css/Core.css";
import "./assets/css/Jstyle.css";

import { Header } from "./import/ImportLayouts.tsx";
import { Footer } from "./import/ImportLayouts.tsx";

import { MainPage } from "./page/main/Main.tsx";
import { AboutMain } from "./page/about/AboutMain.tsx";
import { MenuMain } from "./page/menu/MenuMain.tsx";
import { NoticeMain } from "./page/notice/NoticeMain.tsx";
import { ContactMain } from "./page/contact/ContactMain.tsx";
import { OrderMain } from "./page/order/OrderMain.tsx";

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
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Menu = () => (
  <Routes>
    <Route path="/main" element={<MenuMain />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Notice = () => (
  <Routes>
    <Route path="/main" element={<NoticeMain />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Contact = () => (
  <Routes>
    <Route path="/main" element={<ContactMain />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Order = () => (
  <Routes>
    <Route path="/main" element={<OrderMain />} />
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
        <Route path="/notice/*" element={<Notice />} />
        <Route path="/contact/*" element={<Contact />} />
        <Route path="/order/*" element={<Order />} />
      </Routes>
      <Footer />
    </div>
  );
};

// -------------------------------------------------------------------------------------------------
const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("root element is null");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <LanguageProvider>
      <CssBaseline />
      <App />
    </LanguageProvider>
  </BrowserRouter>
);