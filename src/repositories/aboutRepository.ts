// aboutRepository.ts

import { About } from "@schemas/About";

// 1-1. info ---------------------------------------------------------------------------------------
export const info = async (
) => {
  const finalResult = await About.aggregate([
    {
      $project: {
        _id: 1,
        about_info: 1,
      }
    }
  ]);

  return finalResult;
};

// 1-2. greeting -----------------------------------------------------------------------------------
export const greeting = async (
) => {
  const finalResult = await About.aggregate([
    {
      $project: {
        _id: 1,
        about_greeting: 1,
      }
    }
  ]);

  return finalResult;
}

// 2-2. location -----------------------------------------------------------------------------------
export const location = async (
) => {
  const finalResult = await About.aggregate([
    {
      $project: {
        _id: 1,
        about_location: 1,
      }
    }
  ]);

  return finalResult;
};