// ImportUtils.tsx

import { dataArray } from "@scripts/dataArray";
import { randomNumber, randomTime } from "@scripts/utils";
import { calcDate, strToDecimal, decimalToStr } from "@scripts/utils";
import { insertComma } from "@scripts/utils";
import { makePhoneNumber } from "@scripts/utils";
import { getLocal, setLocal, getSession, setSession } from "@scripts/storage";
import { makeFormData } from "@scripts/form";

import axios from "axios";
import { create } from 'zustand';
import { parseISO, formatISO } from "date-fns";
import moment, { Moment } from "moment-timezone";
import { getCountryForTimezone } from "countries-and-timezones";
import { getAllInfoByISO } from "iso-country-currency";
import Calendar from "react-calendar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';


// -------------------------------------------------------------------------------------------------
export {
  dataArray,
  randomNumber,
  randomTime,
  insertComma,
  calcDate,
  makePhoneNumber,
  strToDecimal,
  decimalToStr,
  getLocal,
  setLocal,
  getSession,
  setSession,
  makeFormData,
  axios,
  create,
  parseISO,
  formatISO,
  moment,
  Moment,
  getCountryForTimezone,
  getAllInfoByISO,
  Calendar,
  Swiper, SwiperSlide, Pagination, Navigation, Autoplay,
};