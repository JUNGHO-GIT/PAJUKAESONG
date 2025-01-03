// ImportPages.tsx

// main
import { Main } from "@pages/Main";

// admin
import { AdminDashboard } from "@pages/admin/AdminDashboard";

// admin
import { AuthError } from "@pages/auth/AuthError";
import { AuthPrivacy } from "@pages/auth/AuthPrivacy";

// about
import { AboutGreeting } from "@pages/about/AboutGreeting";
import { AboutLocation } from "@pages/about/AboutLocation";

// contact
import { ContactList } from "@pages/contact/ContactList";
import { ContactFind } from "@pages/contact/ContactFind";
import { ContactDetail } from "@pages/contact/ContactDetail";
import { ContactSave } from "@pages/contact/ContactSave";
import { ContactUpdate } from "@pages/contact/ContactUpdate";

// franchise
import { FranchiseInfo } from "@pages/franchise/FranchiseInfo";
import { FranchiseList } from "@pages/franchise/FranchiseList";
import { FranchiseDetail } from "@pages/franchise/FranchiseDetail";
import { FranchiseSave } from "@pages/franchise/FranchiseSave";
import { FranchiseUpdate } from "@pages/franchise/FranchiseUpdate";

// menu
import { MenuList } from "@pages/menu/MenuList";
import { MenuDetail } from "@pages/menu/MenuDetail";
import { MenuSave } from "@pages/menu/MenuSave";
import { MenuUpdate } from "@pages/menu/MenuUpdate";

// notice
import { NoticeList } from "@pages/notice/NoticeList";
import { NoticeDetail } from "@pages/notice/NoticeDetail";
import { NoticeSave } from "@pages/notice/NoticeSave";
import { NoticeUpdate } from "@pages/notice/NoticeUpdate";

// order
import { OrderList } from "@pages/order/OrderList";
import { OrderFind } from "@pages/order/OrderFind";
import { OrderDetail } from "@pages/order/OrderDetail";
import { OrderSave } from "@pages/order/OrderSave";
import { OrderUpdate } from "@pages/order/OrderUpdate";

// product
import { ProductList } from "@pages/product/ProductList";
import { ProductDetail } from "@pages/product/ProductDetail";
import { ProductSave } from "@pages/product/ProductSave";
import { ProductUpdate } from "@pages/product/ProductUpdate";

// user
import { UserLogin } from "@pages/user/UserLogin";

// -------------------------------------------------------------------------------------------------
export {
  Main,
  AuthError, AuthPrivacy,
  AdminDashboard,
  AboutGreeting, AboutLocation,
  ContactList, ContactFind, ContactDetail, ContactSave, ContactUpdate,
  FranchiseInfo, FranchiseList, FranchiseDetail, FranchiseSave, FranchiseUpdate,
  MenuList, MenuDetail, MenuSave, MenuUpdate,
  NoticeList, NoticeDetail, NoticeSave, NoticeUpdate,
  OrderList, OrderFind, OrderDetail, OrderSave, OrderUpdate,
  ProductList, ProductDetail, ProductSave, ProductUpdate,
  UserLogin,
};