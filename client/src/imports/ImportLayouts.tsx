// ImportLayouts.tsx

import { lazy } from "@importReacts";

// -------------------------------------------------------------------------------------------------
const Header = lazy(() => import("@interfaces/layouts/Header").then((module) => ({
  default: module.Header
})));
const TitleBar = lazy(() => import("@interfaces/layouts/TitleBar").then((module) => ({
  default: module.TitleBar
})));
const SideBar = lazy(() => import("@interfaces/layouts/SideBar").then((module) => ({
  default: module.SideBar
})));
const Footer = lazy(() => import("@interfaces/layouts/Footer").then((module) => ({
  default: module.Footer
})));
const Loader = lazy(() => import("@interfaces/layouts/Loader").then((module) => ({
  default: module.Loader
})));
const FallBack = lazy(() => import("@interfaces/layouts/FallBack").then((module) => ({
  default: module.FallBack
})));
const Alert = lazy(() => import("@interfaces/layouts/Alert").then((module) => ({
  default: module.Alert
})));
const Confirm = lazy(() => import("@interfaces/layouts/Confirm").then((module) => ({
  default: module.Confirm
})));
const Filter = lazy(() => import("@interfaces/layouts/Filter").then((module) => ({
  default: module.Filter
})));

// -------------------------------------------------------------------------------------------------
export {
  Header,
  TitleBar,
  SideBar,
  Footer,
  Loader,
  FallBack,
  Alert,
  Confirm,
  Filter
};