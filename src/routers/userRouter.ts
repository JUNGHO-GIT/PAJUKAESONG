// userRouter.ts

import express from "express";
import { Request, Response } from "express";
import * as service from "@services/userService";
export const userRouter = express.Router();

// 2-3. userLogin ----------------------------------------------------------------------------------
userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    let result = await service.userLogin (
      req.body.user_id as string,
      req.body.user_pw as string,
    );
    if (result.result === "success") {
      res.json({
        status: "success",
        msg: "로그인 성공",
        result: result.result,
        admin: result.admin,
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "로그인 실패",
        result: null,
      });
    }
  }
  catch (err: any) {
    res.status(500).json({
      status: "error",
      msg: "loginFailed",
      result: null,
      error: err
    });
  }
});