// ImportPages.tsx

import { lazy } from "@importReacts";

// main --------------------------------------------------------------------------------------------
const Main = lazy(() => import("@pages/Main").then((module) => ({
  default: module.Main
})));

// auth --------------------------------------------------------------------------------------------
const AuthError = lazy(() => import("@pages/auth/AuthError").then((module) => ({
  default: module.AuthError
})));
const AuthPrivacy = lazy(() => import("@pages/auth/AuthPrivacy").then((module) => ({
  default: module.AuthPrivacy
})));

// admin -------------------------------------------------------------------------------------------
const AdminDashboard = lazy(() => import("@pages/admin/AdminDashboard").then((module) => ({
  default: module.AdminDashboard
})));

// about -------------------------------------------------------------------------------------------
const AboutGreeting = lazy(() => import("@pages/about/AboutGreeting").then((module) => ({
  default: module.AboutGreeting
})));
const AboutLocation = lazy(() => import("@pages/about/AboutLocation").then((module) => ({
  default: module.AboutLocation
})));

// contact -----------------------------------------------------------------------------------------
const ContactList = lazy(() => import("@pages/contact/ContactList").then((module) => ({
  default: module.ContactList
})));
const ContactFind = lazy(() => import("@pages/contact/ContactFind").then((module) => ({
  default: module.ContactFind
})));
const ContactDetail = lazy(() => import("@pages/contact/ContactDetail").then((module) => ({
  default: module.ContactDetail
})));
const ContactSave = lazy(() => import("@pages/contact/ContactSave").then((module) => ({
  default: module.ContactSave
})));
const ContactUpdate = lazy(() => import("@pages/contact/ContactUpdate").then((module) => ({
  default: module.ContactUpdate
})));

// franchise ---------------------------------------------------------------------------------------
const FranchiseInfo = lazy(() => import("@pages/franchise/FranchiseInfo").then((module) => ({
  default: module.FranchiseInfo
})));
const FranchiseList = lazy(() => import("@pages/franchise/FranchiseList").then((module) => ({
  default: module.FranchiseList
})));
const FranchiseDetail = lazy(() => import("@pages/franchise/FranchiseDetail").then((module) => ({
  default: module.FranchiseDetail
})));
const FranchiseSave = lazy(() => import("@pages/franchise/FranchiseSave").then((module) => ({
  default: module.FranchiseSave
})));
const FranchiseUpdate = lazy(() => import("@pages/franchise/FranchiseUpdate").then((module) => ({
  default: module.FranchiseUpdate
})));

// menu --------------------------------------------------------------------------------------------
const MenuList = lazy(() => import("@pages/menu/MenuList").then((module) => ({
  default: module.MenuList
})));
const MenuDetail = lazy(() => import("@pages/menu/MenuDetail").then((module) => ({
  default: module.MenuDetail
})));
const MenuSave = lazy(() => import("@pages/menu/MenuSave").then((module) => ({
  default: module.MenuSave
})));
const MenuUpdate = lazy(() => import("@pages/menu/MenuUpdate").then((module) => ({
  default: module.MenuUpdate
})));

// notice ------------------------------------------------------------------------------------------
const NoticeList = lazy(() => import("@pages/notice/NoticeList").then((module) => ({
  default: module.NoticeList
})));
const NoticeDetail = lazy(() => import("@pages/notice/NoticeDetail").then((module) => ({
  default: module.NoticeDetail
})));
const NoticeSave = lazy(() => import("@pages/notice/NoticeSave").then((module) => ({
  default: module.NoticeSave
})));
const NoticeUpdate = lazy(() => import("@pages/notice/NoticeUpdate").then((module) => ({
  default: module.NoticeUpdate
})));

// order -------------------------------------------------------------------------------------------
const OrderList = lazy(() => import("@pages/order/OrderList").then((module) => ({
  default: module.OrderList
})));
const OrderFind = lazy(() => import("@pages/order/OrderFind").then((module) => ({
  default: module.OrderFind
})));

const OrderDetail = lazy(() => import("@pages/order/OrderDetail").then((module) => ({
  default: module.OrderDetail
})));
const OrderSave = lazy(() => import("@pages/order/OrderSave").then((module) => ({
  default: module.OrderSave
})));
const OrderUpdate = lazy(() => import("@pages/order/OrderUpdate").then((module) => ({
  default: module.OrderUpdate
})));

// product -----------------------------------------------------------------------------------------
const ProductList = lazy(() => import("@pages/product/ProductList").then((module) => ({
  default: module.ProductList
})));
const ProductDetail = lazy(() => import("@pages/product/ProductDetail").then((module) => ({
  default: module.ProductDetail
})));
const ProductSave = lazy(() => import("@pages/product/ProductSave").then((module) => ({
  default: module.ProductSave
})));
const ProductUpdate = lazy(() => import("@pages/product/ProductUpdate").then((module) => ({
  default: module.ProductUpdate
})));

// user --------------------------------------------------------------------------------------------
const UserLogin = lazy(() => import("@pages/user/UserLogin").then((module) => ({
  default: module.UserLogin
})));

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