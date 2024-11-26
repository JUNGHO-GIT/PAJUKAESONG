// ImportLibs.tsx

import axios from "axios";
import { create } from 'zustand';
import moment, { Moment } from "moment-timezone";
import { parseISO, formatISO } from "date-fns";
import { getCountryForTimezone } from "countries-and-timezones";
import { getAllInfoByISO } from "iso-country-currency";
import { Calendar as CalendarReact } from "react-calendar";
import { Swiper, SwiperSlide } from 'swiper/react';
import type {SwiperProps} from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

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
  SwiperProps,
  Pagination,
  Navigation,
  Autoplay,
};