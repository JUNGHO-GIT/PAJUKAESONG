// ImportUtils.tsx

import { dataArray } from "@scripts/dataArray";
import { randomNumber, randomTime, calcDate, strToDecimal, decimalToStr } from "@scripts/utils";
import { makeFormData } from "@scripts/form";

import axios from "axios";
import numeral from 'numeral';
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
  randomNumber, randomTime, calcDate, strToDecimal, decimalToStr,
  makeFormData,
  axios,
  create,
  parseISO,
  formatISO,
  numeral,
  moment,
  Moment,
  getCountryForTimezone,
  getAllInfoByISO,
  Calendar,
  Swiper, SwiperSlide, Pagination, Navigation, Autoplay,
};