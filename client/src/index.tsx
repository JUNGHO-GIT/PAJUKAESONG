// index.tsx

import "./index.css";
import "swiper/css";
import 'swiper/css/pagination';
import '@styles/Components.css';
import "@styles/Core.css";
import "@styles/Mui.css";
import "@styles/Jstyle.css";

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
  ContactList, ContactFind, ContactDetail, ContactSave, ContactUpdate,
  FranchiseInfo, FranchiseList, FranchiseDetail, FranchiseSave, FranchiseUpdate,
  MenuList, MenuDetail, MenuSave, MenuUpdate,
  NoticeList, NoticeDetail, NoticeSave, NoticeUpdate,
  OrderList, OrderFind, OrderDetail, OrderSave, OrderUpdate,
  ProductList, ProductDetail, ProductSave, ProductUpdate,
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
    <Route path={"/update"} element={<ContactUpdate />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Franchise = () => (
  <Routes>
    <Route path={"/info"} element={<FranchiseInfo />} />
    <Route path={"/list"} element={<FranchiseList />} />
    <Route path={"/detail"} element={<FranchiseDetail />} />
    <Route path={"/save"} element={<FranchiseSave />} />
    <Route path={"/update"} element={<FranchiseUpdate />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Menu = () => (
  <Routes>
    <Route path={"/list"} element={<MenuList />} />
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
    <Route path={"/list"} element={<OrderList />} />
    <Route path={"/find"} element={<OrderFind />} />
    <Route path={"/detail"} element={<OrderDetail />} />
    <Route path={"/save"} element={<OrderSave />} />
    <Route path={"/update"} element={<OrderUpdate />} />
  </Routes>
);

// -------------------------------------------------------------------------------------------------
const Product = () => (
  <Routes>
    <Route path={"/list"} element={<ProductList />} />
    <Route path={"/detail"} element={<ProductDetail />} />
    <Route path={"/save"} element={<ProductSave />} />
    <Route path={"/update"} element={<ProductUpdate />} />
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
        <Route path={"/product/*"} element={<Product />} />
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