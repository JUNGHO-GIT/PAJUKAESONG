// adminRepository.ts

import { Visit } from "@schemas/Visit";

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async (
  ip_param: string,
  date_param: string,
) => {

  const finalResult:any = await Visit.findOne(
    {
      visit_date: date_param,
      visit_ip: ip_param
    }
  )
  .lean();

  return finalResult;
};

// 3. save -----------------------------------------------------------------------------------------
export const save = async (
  ip_param: string,
  date_param: string,
) => {

  const finalResult = await Visit.create(
    {
      visit_date: date_param,
      visit_ip: ip_param,
      visit_count: 1
    }
  );

  return finalResult;
};