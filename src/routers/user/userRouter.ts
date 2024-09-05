// userRouter.ts

import express from "express";
import { Request, Response } from "express";
import * as service from "@services/user/userService";
export const router = express.Router();

// 2-3. userLogin ----------------------------------------------------------------------------------
router.post("/login", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.userLogin (
      req.body.user_id as string,
      req.body.user_pw as string
    );
    if (result.result === "success") {
      res.json({
        status: "success",
        msg: "로그인 성공",
        result: finalResult.result,
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
    console.error(err);
    res.status(500).json({
      status: "error",
      error: err.toString()
    });
  }
});