// ImportLibs.tsx

import axios from "axios";
import classNames from "classnames";
import { parseISO, formatISO } from "date-fns";
import numeral from 'numeral';
import moment from "moment-timezone";
import Calendar from "react-calendar";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination } from 'swiper/modules';
import { Navigation as SwiperNavigation } from 'swiper/modules';
import { Autoplay as SwiperAutoplay } from 'swiper/modules';

// -------------------------------------------------------------------------------------------------
export {
  axios,
  classNames,
  parseISO,
  formatISO,
  numeral,
  moment,
  Calendar,
  Swiper, SwiperSlide,
  SwiperPagination, SwiperNavigation, SwiperAutoplay
};