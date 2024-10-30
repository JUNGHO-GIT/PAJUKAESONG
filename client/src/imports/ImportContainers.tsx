// ImportContainers.tsx

import { lazy } from "@importReacts";

// -------------------------------------------------------------------------------------------------
const PopUp = lazy(() => import("@interfaces/containers/PopUp").then((module) => ({
  default: module.PopUp
})));
const Location = lazy(() => import("@interfaces/containers/Location").then((module) => ({
  default: module.Location
})));
const Input = lazy(() => import("@interfaces/containers/Input").then((module) => ({
  default: module.Input
})));
const Select = lazy(() => import("@interfaces/containers/Select").then((module) => ({
  default: module.Select
})));
const TextArea = lazy(() => import("@interfaces/containers/TextArea").then((module) => ({
  default: module.TextArea
})));
const InputFile = lazy(() => import("@interfaces/containers/InputFile").then((module) => ({
  default: module.InputFile
})));
const PickerTime = lazy(() => import("@interfaces/containers/PickerTime").then((module) => ({
  default: module.PickerTime
})));
const PickerDay = lazy(() => import("@interfaces/containers/PickerDay").then((module) => ({
  default: module.PickerDay
})));

// -------------------------------------------------------------------------------------------------
export {
  PopUp,
  Location,
  Input,
  Select,
  TextArea,
  InputFile,
  PickerTime,
  PickerDay,
};