// aboutRepository.ts

import mongoose from "mongoose";
import { Contact } from "@schemas/Contact";
import { newDate } from "@scripts/date";

// 1-2. greeting -----------------------------------------------------------------------------------
export const greeting = async (
) => {
  const finalResult = await Contact.aggregate([
    {
      $project: {
        _id: 1,
        about_greeting_content: 1,
        about_greeting_image: 1,
      }
    }
  ]);

  return finalResult;
}

// 2-2. location -----------------------------------------------------------------------------------
export const location = async (
) => {
  const finalResult = await Contact.aggregate([
    {
      $project: {
        _id: 1,
        about_location_coordinate: 1,
        about_location_image: 1,
      }
    }
  ]);

  return finalResult;
};