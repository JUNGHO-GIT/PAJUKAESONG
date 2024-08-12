// userSyncMiddleware.js

// 1. percent --------------------------------------------------------------------------------------
export const percent = async (object) => {

  if (!object) {
    return [];
  }

  // 1. exercise
  const diffExercise = (goal, real, extra) => {

    let score = 0;
    let percent = 0;

    if (extra === "count" || extra === "volume") {
      percent = ((real - goal) / goal) * 100;
      // 1. ~ 1%
      if (percent <= 1) {
        score = 1;
      }
      // 2. 1% ~ 10%
      else if (percent > 1 && percent <= 10) {
        score = 2;
      }
      // 3. 10% ~ 30%
      else if (percent > 10 && percent <= 30) {
        score = 3;
      }
      // 4. 30% ~ 50%
      else if (percent > 30 && percent <= 50) {
        score = 4;
      }
      // 5. 50% ~
      else {
        score = 5;
      }
    }
    else if (extra === "weight") {
      percent = ((real - goal) / goal) * 100;
      // 1. ~ 1%
      if (percent <= 1) {
        score = 5;
      }
      // 2. 1% ~ 10%
      else if (percent > 1 && percent <= 10) {
        score = 4;
      }
      // 3. 10% ~ 30%
      else if (percent > 10 && percent <= 30) {
        score = 3;
      }
      // 4. 30% ~ 50%
      else if (percent > 30 && percent <= 50) {
        score = 2;
      }
      // 5. 50% ~
      else {
        score = 1;
      }
    }
    else if (extra === "cardio") {
      const hoursGoal = parseInt(goal?.split(":")[0], 10);
      const minutesGoal = parseInt(goal?.split(":")[1], 10);
      const hoursReal = parseInt(real?.split(":")[0], 10);
      const minutesReal = parseInt(real?.split(":")[1], 10);
      const hours = Math.abs(hoursGoal - hoursReal);
      const minutes = Math.abs(minutesGoal - minutesReal);
      const diffVal = (hours * 60) + minutes;
      percent = ((diffVal - goal) / goal) * 100;
      // 1. ~ 10분
      if (0 <= diffVal && diffVal <= 10) {
        score = 1;
      }
      // 2. 10분 ~ 20분
      else if (10 < diffVal && diffVal <= 20) {
        score = 2;
      }
      // 3. 20분 ~ 30분
      else if (20 < diffVal && diffVal <= 30) {
        score = 3;
      }
      // 4. 30분 ~ 50분
      else if (30 < diffVal && diffVal <= 50) {
        score = 4;
      }
      // 5. 50분 ~
      else {
        score = 5;
      }
    }
    return {
      score: Math.abs(score).toFixed(2) === "NaN" ? "0.00" : Math.abs(score).toFixed(2),
      percent: Math.abs(percent).toFixed(2) === "NaN" ? "0.00" : Math.abs(percent).toFixed(2),
    };
  };

  // 2. food
  const diffFood = (goal, real, extra) => {

    let score = 0;
    let percent = 0;

    if (extra === "kcal" || extra === "carb" || extra === "protein" || extra === "fat") {
      percent = ((real - goal) / goal) * 100;

      // 1. ~ 1%
      if (percent <= 1) {
        score = 5;
      }
      // 2. 1% ~ 10%
      else if (percent > 1 && percent <= 10) {
        score = 4;
      }
      // 3. 10% ~ 30%
      else if (percent > 10 && percent <= 30) {
        score = 3;
      }
      // 4. 30% ~ 50%
      else if (percent > 30 && percent <= 50) {
        score = 2;
      }
      // 5. 50% ~
      else {
        score = 1;
      }
    }
    return {
      score: Math.abs(score).toFixed(2) === "NaN" ? "0.00" : Math.abs(score).toFixed(2),
      percent: Math.abs(percent).toFixed(2) === "NaN" ? "0.00" : Math.abs(percent).toFixed(2),
    };
  };

  // 3. money
  const diffMoney = (goal, real, extra) => {

    let percent = 0;
    let score = 0;

    if (extra === "income") {
      percent = (Math.abs(goal - real) / goal) * 100;
      if (goal > real) {
        if (percent > 0 && percent <= 1) {
          score = 5;
        }
        // 2. 1% ~ 10%
        else if (percent > 1 && percent <= 10) {
          score = 4;
        }
        // 3. 10% ~ 30%
        else if (percent > 10 && percent <= 30) {
          score = 3;
        }
        // 4. 30% ~ 50%
        else if (percent > 30 && percent <= 50) {
          score = 2;
        }
        // 5. 50% ~
        else {
          score = 1;
        }
      }
      else {
        // 1. 0% ~ 1%
        if (percent > 0 && percent <= 1) {
          score = 1;
        }
        // 2. 1% ~ 10%
        else if (percent > 1 && percent <= 10) {
          score = 2;
        }
        // 3. 10% ~ 30%
        else if (percent > 10 && percent <= 30) {
          score = 3;
        }
        // 4. 30% ~ 50%
        else if (percent > 30 && percent <= 50) {
          score = 4;
        }
        // 5. 50% ~
        else {
          score = 5;
        }
      }
    }
    else if (extra === "expense") {
      percent = (Math.abs(goal - real) / goal) * 100;
      if (goal > real) {
        // 1. 0% ~ 1%
        if (percent > 0 && percent <= 1) {
          score = 1;
        }
        // 2. 1% ~ 10%
        else if (percent > 1 && percent <= 10) {
          score = 2;
        }
        // 3. 10% ~ 30%
        else if (percent > 10 && percent <= 30) {
          score = 3;
        }
        // 4. 30% ~ 50%
        else if (percent > 30 && percent <= 50) {
          score = 4;
        }
        // 5. 50% ~
        else {
          score = 5;
        }
      }
      else {
        // 1. 0% ~ 1%
        if (percent > 0 && percent <= 1) {
          score = 5;
        }
        // 2. 1% ~ 10%
        else if (percent > 1 && percent <= 10) {
          score = 4;
        }
        // 3. 10% ~ 30%
        else if (percent > 10 && percent <= 30) {
          score = 3;
        }
        // 4. 30% ~ 50%
        else if (percent > 30 && percent <= 50) {
          score = 2;
        }
        // 5. 50% ~
        else {
          score = 1;
        }
      }
    }
    return {
      score: Math.abs(score).toFixed(2) === "NaN" ? "0.00" : Math.abs(score).toFixed(2),
      percent: Math.abs(percent).toFixed(2) === "NaN" ? "0.00" : Math.abs(percent).toFixed(2),
    };
  };

  // 4. sleep
  const diffSleep = (goal, real, extra) => {

    let score = 0;
    let percent = 0;

    if (extra === "bedTime" || extra === "wakeTime") {
      const goalDate = new Date(`1970-01-01T${goal}Z`);
      const realDate = new Date(`1970-01-01T${real}Z`);
      let diffVal = 0;
      if (realDate < goalDate) {
        diffVal = goalDate.getTime() - realDate.getTime();
      }
      else {
        diffVal = realDate.getTime() - goalDate.getTime();
      }
      percent = (diffVal / goalDate.getTime()) * 100;

      // 1. 10분이내
      if (0 <= diffVal && diffVal <= 600000) {
        score = 5;
      }
      // 2. 10분 ~ 20분
      else if (600000 < diffVal && diffVal <= 1200000) {
        score = 4;
      }
      // 3. 20분 ~ 30분
      else if (1200000 < diffVal && diffVal <= 1800000) {
        score = 3;
      }
      // 4. 30분 ~ 50분
      else if (1800000 < diffVal && diffVal <= 3000000) {
        score = 2;
      }
      // 5. 50분 ~
      else {
        score = 1;
      }
    }
    else if (extra === "sleepTime") {
      const hoursGoal = parseInt(goal?.split(":")[0], 10);
      const minutesGoal = parseInt(goal?.split(":")[1], 10);
      const hoursReal = parseInt(real?.split(":")[0], 10);
      const minutesReal = parseInt(real?.split(":")[1], 10);
      const hours = Math.abs(hoursGoal - hoursReal);
      const minutes = Math.abs(minutesGoal - minutesReal);

      const diffVal = (hours * 60) + minutes;
      const totalGoalMinutes = (hoursGoal * 60) + minutesGoal;
      percent = ((diffVal - totalGoalMinutes) / totalGoalMinutes) * 100;

      // 1. ~ 10분
      if (0 <= diffVal && diffVal <= 10) {
        score = 5;
      }
      // 2. 10분 ~ 20분
      else if (10 < diffVal && diffVal <= 20) {
        score = 4;
      }
      // 3. 20분 ~ 30분
      else if (20 < diffVal && diffVal <= 30) {
        score = 3;
      }
      // 4. 30분 ~ 50분
      else if (30 < diffVal && diffVal <= 50) {
        score = 2;
      }
      // 5. 50분 ~
      else {
        score = 1;
      }
    }

    return {
      score: Math.abs(score).toFixed(2) === "NaN" ? "0.00" : Math.abs(score).toFixed(2),
      percent: Math.abs(percent).toFixed(2) === "NaN" ? "0.00" : Math.abs(percent).toFixed(2),
    };
  };

  // 1. exercise
  let exercise = {};
  if (!object?.exerciseGoal || !object?.exercise) {
    exercise = {
      diff_count: {
        score: "1.00",
        percent: "0.00",
      },
      diff_volume: {
        score: "1.00",
        percent: "0.00",
      },
      diff_cardio: {
        score: "1.00",
        percent: "0.00",
      },
      diff_weight: {
        score: "1.00",
        percent: "0.00",
      },
    };
  }
  else {
    exercise = {
      diff_count: diffExercise(
        object?.exerciseGoal?.exercise_goal_count,
        object?.exercise?.exercise_total_count,
        "count"
      ),
      diff_volume: diffExercise(
        object?.exerciseGoal?.exercise_goal_volume,
        object?.exercise?.exercise_total_volume,
        "volume"
      ),
      diff_cardio: diffExercise(
        object?.exerciseGoal?.exercise_goal_cardio,
        object?.exercise?.exercise_total_cardio,
        "cardio"
      ),
      diff_weight:diffExercise(
        object?.exerciseGoal?.exercise_goal_weight,
        object?.exercise?.exercise_body_weight,
        "weight"
      ),
    };
  }

  // 2. food
  let food = {};
  if (!object?.foodGoal || !object?.food) {
    food = {
      diff_kcal: {
        score: "1.00",
        percent: "0.00",
      },
      diff_carb: {
        score: "1.00",
        percent: "0.00",
      },
      diff_protein: {
        score: "1.00",
        percent: "0.00",
      },
      diff_fat: {
        score: "1.00",
        percent: "0.00",
      },
    };
  }
  else {
    food = {
      diff_kcal: diffFood(
        object?.foodGoal?.food_goal_kcal,
        object?.food?.food_total_kcal,
        "kcal"
      ),
      diff_carb: diffFood(
        object?.foodGoal?.food_goal_carb,
        object?.food?.food_total_carb,
        "carb"
      ),
      diff_protein: diffFood(
        object?.foodGoal?.food_goal_protein,
        object?.food?.food_total_protein,
        "protein"
      ),
      diff_fat: diffFood(
        object?.foodGoal?.food_goal_fat,
        object?.food?.food_total_fat,
        "fat"
      ),
    };
  }

  // 3. money
  let money = {};
  if (!object?.moneyGoal || !object?.money) {
    money = {
      diff_income: {
        score: "1.00",
        percent: "0.00",
      },
      diff_expense: {
        score: "1.00",
        percent: "0.00",
      },
    };
  }
  else {
    money = {
      diff_income: diffMoney(
        object?.moneyGoal?.money_goal_income,
        object?.money?.money_total_income,
        "income"
      ),
      diff_expense: diffMoney(
        object?.moneyGoal?.money_goal_expense,
        object?.money?.money_total_expense,
        "expense"
      ),
    };
  }

  // 4. sleep
  let sleep = {};
  if (!object?.sleepGoal || !object?.sleep) {
    sleep = {
      diff_bedTime: {
        score: "1.00",
        percent: "0.00",
      },
      diff_wakeTime: {
        score: "1.00",
        percent: "0.00",
      },
      diff_sleepTime: {
        score: "1.00",
        percent: "0.00",
      },
    };
  }
  else {
    sleep = {
      diff_bedTime: diffSleep(
        object?.sleepGoal?.sleep_goal_bedTime,
        object?.sleep?.sleep_bedTime,
        "bedTime"
      ),
      diff_wakeTime: diffSleep(
        object?.sleepGoal?.sleep_goal_wakeTime,
        object?.sleep?.sleep_wakeTime,
        "wakeTime"
      ),
      diff_sleepTime: diffSleep(
        object?.sleepGoal?.sleep_goal_sleepTime,
        object?.sleep?.sleep_sleepTime,
        "sleepTime"
      ),
    };
  }

  const calcAverage = (object) => {
    let sumScore = 0;
    let sumPercent = 0;
    let count = 0;
    for (const key in object) {
      sumScore += parseFloat(object[key]?.score);
      sumPercent += parseFloat(object[key]?.percent);
      count++;
    }
    if (count === 0) {
      return {
        score: "1.00",
        percent: "0.00",
      };
    }
    return {
      score: (sumScore / count).toFixed(2) || "1.00",
      percent: (sumPercent / count).toFixed(2) || "1.00",
    };
  };

  const newObject = {
    exercise: {
      ...exercise,
      average: calcAverage(exercise),
    },
    food: {
      ...food,
      average: calcAverage(food),
    },
    money: {
      ...money,
      average: calcAverage(money),
    },
    sleep: {
      ...sleep,
      average: calcAverage(sleep),
    }
  };

  // 5. total
  const total = {
    score: 0,
    percent: 0,
    count: "",
  };

  ["exercise", "food", "money", "sleep"]?.forEach(category => {
    total.score += parseFloat(newObject[category]?.average.score);
    total.percent += parseFloat(newObject[category]?.average.percent);
    total.count++;
  });

  if (total.count > 0) {
    newObject.total = {
      average: {
        score: (total.score / total.count).toFixed(2),
        percent: (total.percent / total.count).toFixed(2),
      }
    };
  }

  return newObject;
};