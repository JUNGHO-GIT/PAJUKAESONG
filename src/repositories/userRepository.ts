// userRepository.ts

import mongoose from "mongoose";
import { User } from "@schemas/User";

// 0. checkId --------------------------------------------------------------------------------------
export const checkId = async (
  user_id_param: string,
) => {
  const finalResult = await User.findOne(
    {
      user_id: user_id_param,
    }
  )
  .lean();

  return finalResult;
}

// 1. login ----------------------------------------------------------------------------------------
export const login = async (
  user_id_param: string,
  user_pw_param: string,
) => {
  const finalResult = await User.findOne(
    {
      user_id: user_id_param,
      user_pw: user_pw_param,
    }
  )
  .lean();

  return finalResult;
}

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async (
  _id_param: string,
) => {
  const finalResult = await User.findOne(
    {
      _id: _id_param,
    }
  )
  .lean();

  return finalResult;
};

// 3. save -----------------------------------------------------------------------------------------
export const save = async (
  OBJECT_param: any,
) => {
  const finalResult = await User.create(
    {
      _id: new mongoose.Types.ObjectId(),
      user_id: OBJECT_param.user_id,
      user_token: OBJECT_param.user_token,
      user_pw: OBJECT_param.user_pw,
      user_regDt: new Date(),
      user_updateDt: null
    }
  );

  return finalResult;
};

// 4. update ---------------------------------------------------------------------------------------
export const update = async (
  _id_param: string,
  OBJECT_param: any,
) => {
  const finalResult = await User.findOneAndUpdate(
    {
      _id: _id_param
    },
    {
      $set: {
        user_id: OBJECT_param.user_id,
        user_pw: OBJECT_param.user_pw,
        user_updateDt: new Date(),
      }
    },
    {
      upsert: true,
      new: true
    }
  )
  .lean();

  return finalResult;
};

// 5. delete ---------------------------------------------------------------------------------------
export const deletes = async (
  _id_param: string,
) => {
  const finalResult = await User.findOneAndDelete(
    {
      _id: _id_param
    }
  );

  return finalResult;
};
