// ImportLibs.tsx

import axios from "axios";
import { parseISO, formatISO } from "date-fns";
import numeral from 'numeral';
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
  axios,
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