// index.tsx

import "swiper/css";
import 'swiper/css/pagination';
import '@assets/styles/Components.css';
import "@assets/styles/Core.css";
import "@assets/styles/Mui.css";
import "@assets/styles/Jstyle.css";
import "./index.css";

import {
  BrowserRouter, Routes, Route, createRoot, useState, useEffect
} from "@importReacts";

import {
  CssBaseline, createTheme, ThemeProvider
} from "@importMuis";

import {
  useRoot, useScrollTop, useLanguageSetting
} from "@importHooks";

import {
  Header, Footer, Alert, Confirm, TitleBar, Loader
} from "@importLayouts";

import {
  Main
} from "@importPages";

import {
  AdminDashboard,
} from "@importPages";

import {
  AboutGreeting, AboutLocation
} from "@importPages";

import {
  ContactList, ContactFind, ContactDetail, ContactSave, ContactUpdate
} from "@importPages";

import {
  FranchiseInfo, FranchiseList, FranchiseDetail, FranchiseSave, FranchiseUpdate
} from "@importPages";

import {
  MenuList, MenuDetail, MenuSave, MenuUpdate
} from "@importPages";

import {
  NoticeList, NoticeDetail, NoticeSave, NoticeUpdate
} from "@importPages";

import {
  OrderList, OrderFind, OrderDetail, OrderSave, OrderUpdate
} from "@importPages";

import {
  ProductList, ProductDetail, ProductSave, ProductUpdate
} from "@importPages";

import {
  UserLogin, AuthError, AuthPrivacy
} from "@importPages";

// -------------------------------------------------------------------------------------------------
const App = () => {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useRoot();
  useScrollTop();
  useLanguageSetting();

  return (
    !loading ? (
      <div className={"App"}>
        <Header />
        <TitleBar />
        <Alert />
        <Confirm />
        <Routes>
          {/** root **/}
          <Route path={"/*"} element={<Main />} />
          {/** user **/}
          <Route path={"/user/login/*"} element={<UserLogin />} />
          {/** auth **/}
          <Route path={"/auth/error/*"} element={<AuthError />} />
          <Route path={"/auth/privacy/*"} element={<AuthPrivacy />} />
          {/** admin **/}
          <Route path={"/admin/dashboard/*"} element={<AdminDashboard />} />
          {/** about **/}
          <Route path={"/about/greeting/*"} element={<AboutGreeting />} />
          <Route path={"/about/location/*"} element={<AboutLocation />} />
          {/** contact **/}
          <Route path={"/contact/find/*"} element={<ContactFind />} />
          <Route path={"/contact/list/*"} element={<ContactList />} />
          <Route path={"/contact/detail/*"} element={<ContactDetail />} />
          <Route path={"/contact/save/*"} element={<ContactSave />} />
          <Route path={"/contact/update/*"} element={<ContactUpdate />} />
          {/** franchise **/}
          <Route path={"/franchise/info/*"} element={<FranchiseInfo />} />
          <Route path={"/franchise/list/*"} element={<FranchiseList />} />
          <Route path={"/franchise/detail/*"} element={<FranchiseDetail />} />
          <Route path={"/franchise/save/*"} element={<FranchiseSave />} />
          <Route path={"/franchise/update/*"} element={<FranchiseUpdate />} />
          {/** menu **/}
          <Route path={"/menu/list/*"} element={<MenuList />} />
          <Route path={"/menu/save/*"} element={<MenuSave />} />
          <Route path={"/menu/update/*"} element={<MenuUpdate />} />
          <Route path={"/menu/detail/*"} element={<MenuDetail />} />
          {/** notice **/}
          <Route path={"/notice/list/*"} element={<NoticeList />} />
          <Route path={"/notice/detail/*"} element={<NoticeDetail />} />
          <Route path={"/notice/save/*"} element={<NoticeSave />} />
          <Route path={"/notice/update/*"} element={<NoticeUpdate />} />
          {/** order **/}
          <Route path={"/order/list/*"} element={<OrderList />} />
          <Route path={"/order/find/*"} element={<OrderFind />} />
          <Route path={"/order/detail/*"} element={<OrderDetail />} />
          <Route path={"/order/save/*"} element={<OrderSave />} />
          <Route path={"/order/update/*"} element={<OrderUpdate />} />
          {/** product **/}
          <Route path={"/product/list/*"} element={<ProductList />} />
          <Route path={"/product/detail/*"} element={<ProductDetail />} />
          <Route path={"/product/save/*"} element={<ProductSave />} />
          <Route path={"/product/update/*"} element={<ProductUpdate />} />
        </Routes>
        <Footer />
      </div>
    ) : <Loader />
  );
};

// -------------------------------------------------------------------------------------------------
createRoot(document.getElementById('root') as HTMLDivElement).render(
  <BrowserRouter basename={"/PAJUKAESONG"}>
    <ThemeProvider theme={
      createTheme({
        typography: {
          fontFamily: "Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif"
        }
      })
    }>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);