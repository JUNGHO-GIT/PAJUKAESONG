// foodDiffService.js

import * as repository from "../../repository/food/foodDiffRepository.js";

// 1. list (리스트는 gte lte) ----------------------------------------------------------------------
export const list = async (
  user_id_param, PAGING_param, DATE_param
) => {

  const dateTypeOrder = ["day", "week", "month", "year"];
  const dateType = DATE_param.dateType;
  const dateStart = DATE_param.dateStart;
  const dateEnd = DATE_param.dateEnd;

  const sort = PAGING_param.sort === "asc" ? 1 : -1;
  const page = PAGING_param.page === 0 ? 1 : PAGING_param.page;

  const totalCnt = await repository.list.cnt(
    user_id_param, dateType, dateStart, dateEnd
  );
  const listGoal = await repository.list.listGoal(
    user_id_param, dateType, dateStart, dateEnd, sort, page
  );

  listGoal.sort((a, b) => {
    const dateTypeA = a.food_goal_dateType;
    const dateTypeB = b.food_goal_dateType;
    const dateStartA = new Date(a.food_goal_dateStart);
    const dateStartB = new Date(b.food_goal_dateStart);
    const sortOrder = sort;

    const dateTypeDiff = dateTypeOrder.indexOf(dateTypeA) - dateTypeOrder.indexOf(dateTypeB);
    const dateDiff = dateStartA.getTime() - dateStartB.getTime();

    if (dateTypeDiff !== 0) {
      return dateTypeDiff;
    }
    return sortOrder === 1 ? dateDiff : -dateDiff;
  });

  const finalResult = await Promise.all(listGoal.map(async (goal) => {
    const dateStart = goal?.food_goal_dateStart;
    const dateEnd = goal?.food_goal_dateEnd;

    const listReal = await repository.list.list (
      user_id_param, dateType, dateStart, dateEnd
    );

    const foodTotalKcal = listReal.reduce((acc, curr) => (
      acc + (curr?.food_total_kcal ?? 0)
    ), 0);
    const foodTotalCarb = listReal.reduce((acc, curr) => (
      acc + (curr?.food_total_carb ?? 0)
    ), 0);
    const foodTotalProtein = listReal.reduce((acc, curr) => (
      acc + (curr?.food_total_protein ?? 0)
    ), 0);
    const foodTotalFat = listReal.reduce((acc, curr) => (
      acc + (curr?.food_total_fat ?? 0)
    ), 0);

    return {
      ...goal,
      food_total_kcal: foodTotalKcal,
      food_total_carb: foodTotalCarb,
      food_total_protein: foodTotalProtein,
      food_total_fat: foodTotalFat
    };
  }));

  return {
    totalCnt : totalCnt,
    result : finalResult
  }
};