// ImportLibs.tsx

import axios from "axios";
import { create } from 'zustand';
import moment, { Moment } from "moment-timezone";
import { parseISO, formatISO } from "date-fns";
import { getCountryForTimezone } from "countries-and-timezones";
import { getAllInfoByISO } from "iso-country-currency";
import { Calendar as CalendarReact } from "react-calendar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';

// -------------------------------------------------------------------------------------------------
export {
  axios,
  create,
  parseISO,
  formatISO,
  moment,
  Moment,
  CalendarReact,
  getCountryForTimezone,
  getAllInfoByISO,
  Swiper,
  SwiperSlide,
  Pagination,
  Navigation,
  Autoplay,
};