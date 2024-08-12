// sleepGoalRepository.js

import mongoose from "mongoose";
import {SleepGoal} from "../../schema/sleep/SleepGoal.js";
import {newDate} from "../../assets/js/date.js";

// 0. exist ----------------------------------------------------------------------------------------
export const exist = {

  // sleep_dateType 이 존재하는 경우
  exist: async (
    user_id_param,
    dateType_param, dateStart_param, dateEnd_param
  ) => {
    const finalResult = await SleepGoal.aggregate([
      {$match: {
        user_id: user_id_param,
        sleep_goal_dateStart: {
          $gte: dateStart_param,
          $lte: dateEnd_param
        },
        sleep_goal_dateEnd: {
          $gte: dateStart_param,
          $lte: dateEnd_param
        },
        ...(dateType_param === "전체" ? {} : {
          sleep_goal_dateType: dateType_param
        }),
      }},
      {$match: {
        sleep_goal_dateType: {$exists: true}
      }},
      {$group: {
        _id: null,
        existDate: {$addToSet: "$sleep_goal_dateStart"}
      }}
    ]);
    return finalResult;
  }
};

// 1. list (리스트는 gte lte) ----------------------------------------------------------------------
export const list = {

  cnt: async (
    user_id_param,
    dateType_param, dateStart_param, dateEnd_param,
  ) => {
    const finalResult = await SleepGoal.countDocuments({
      user_id: user_id_param,
      sleep_goal_dateStart: {
        $lte: dateEnd_param,
      },
      sleep_goal_dateEnd: {
        $gte: dateStart_param,
      },
      ...(dateType_param === "" ? {} : {
        sleep_goal_dateType: dateType_param
      }),
    });
    return finalResult;
  },

  list: async (
    user_id_param,
    dateType_param, dateStart_param, dateEnd_param,
    sort_param, page_param,
  ) => {
    const finalResult = await SleepGoal.aggregate([
      {$match: {
        user_id: user_id_param,
        sleep_goal_dateStart: {
          $lte: dateEnd_param,
        },
        sleep_goal_dateEnd: {
          $gte: dateStart_param,
        },
        ...(dateType_param === "" ? {} : {
          sleep_goal_dateType: dateType_param
        }),
      }},
      {$project: {
        _id: 1,
        sleep_goal_dateType: 1,
        sleep_goal_dateStart: 1,
        sleep_goal_dateEnd: 1,
        sleep_goal_bedTime: 1,
        sleep_goal_wakeTime: 1,
        sleep_goal_sleepTime: 1,
      }},
      {$sort: {sleep_goal_dateStart: sort_param}},
      {$skip: Number(page_param - 1)},
    ]);
    return finalResult;
  }
};

// 2. detail (상세는 eq) ---------------------------------------------------------------------------
export const detail = {
  detail: async (
    user_id_param, _id_param,
    dateType_param, dateStart_param, dateEnd_param
  ) => {
    const finalResult = await SleepGoal.findOne({
      user_id: user_id_param,
      _id: !_id_param ? {$exists:true} : _id_param,
      sleep_goal_dateStart: {
        $eq: dateStart_param,
      },
      sleep_goal_dateEnd: {
        $eq: dateEnd_param,
      },
      ...(dateType_param === "전체" ? {} : {
        sleep_goal_dateType: dateType_param
      }),
    })
    .lean();
    return finalResult;
  }
};

// 3. save -----------------------------------------------------------------------------------------
export const save = {
  detail: async (
    user_id_param, _id_param,
    dateType_param, dateStart_param, dateEnd_param
  ) => {
    const finalResult = await SleepGoal.findOne({
      user_id: user_id_param,
      _id: !_id_param ? {$exists:true} : _id_param,
      sleep_goal_dateStart: {
        $eq: dateStart_param,
      },
      sleep_goal_dateEnd: {
        $eq: dateEnd_param,
      },
      ...(dateType_param === "전체" ? {} : {
        sleep_goal_dateType: dateType_param
      }),
    })
    .lean();
    return finalResult;
  },

  create: async (
    user_id_param, OBJECT_param,
    dateType_param, dateStart_param, dateEnd_param
  ) => {
    const finalResult = await SleepGoal.create({
      user_id: user_id_param,
      _id: new mongoose.Types.ObjectId(),
      sleep_goal_dummy: "N",
      sleep_goal_dateType: dateType_param,
      sleep_goal_dateStart: dateStart_param,
      sleep_goal_dateEnd: dateEnd_param,
      sleep_goal_bedTime: OBJECT_param.sleep_goal_bedTime,
      sleep_goal_wakeTime: OBJECT_param.sleep_goal_wakeTime,
      sleep_goal_sleepTime: OBJECT_param.sleep_goal_sleepTime,
      sleep_goal_regDt: newDate,
      sleep_goal_updateDt: "",
    });
    return finalResult;
  },

  update: async (
    user_id_param, _id_param, OBJECT_param,
    dateType_param, dateStart_param, dateEnd_param
  ) => {
    const finalResult = await SleepGoal.findOneAndUpdate(
      {user_id: user_id_param,
        _id: !_id_param ? {$exists:true} : _id_param
      },
      {$set: {
        sleep_goal_dateType: dateType_param,
        sleep_goal_dateStart: dateStart_param,
        sleep_goal_dateEnd: dateEnd_param,
        sleep_goal_bedTime: OBJECT_param.sleep_goal_bedTime,
        sleep_goal_wakeTime: OBJECT_param.sleep_goal_wakeTime,
        sleep_goal_sleepTime: OBJECT_param.sleep_goal_sleepTime,
        sleep_goal_updateDt: newDate,
      }},
      {upsert: true, new: true}
    )
    .lean();
    return finalResult;
  }
};

// 4. deletes --------------------------------------------------------------------------------------
export const deletes = {
  detail: async (
    user_id_param, _id_param,
    dateType_param, dateStart_param, dateEnd_param
  ) => {
    const finalResult = await SleepGoal.findOne({
      user_id: user_id_param,
      _id: !_id_param ? {$exists:true} : _id_param,
      sleep_goal_dateStart: {
        $eq: dateStart_param,
      },
      sleep_goal_dateEnd: {
        $eq: dateEnd_param,
      },
      ...(dateType_param === "전체" ? {} : {
        sleep_goal_dateType: dateType_param
      }),
    })
    .lean();
    return finalResult;
  },

  deletes: async (
    user_id_param, _id_param
  ) => {
    const deleteResult = await SleepGoal.deleteOne({
      user_id: user_id_param,
      _id: !_id_param ? {$exists:true} : _id_param
    })
    .lean();
    return deleteResult;
  }
};