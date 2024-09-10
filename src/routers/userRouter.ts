// userRouter.ts
import express, { Request, Response } from "express";
import * as service from "@services/userService";
export const router = express.Router();

// 2-1. login --------------------------------------------------------------------------------------
router.post("/login", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.login (
      req.body.user_id as string,
      req.body.user_pw as string,
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "로그인 성공",
        status: finalResult.status,
        result: finalResult.result,
        admin: finalResult.admin,
      });
    }
    else if (finalResult.status === "notExist") {
      res.json({
        msg: "아이디가 존재하지 않습니다.",
        status: finalResult.status,
        result: finalResult.result,
        admin: null,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "아이디 또는 비밀번호가 일치하지 않습니다.",
        status: finalResult.status,
        result: finalResult.result,
        admin: null,
      });
    }
    else {
      res.json({
        msg: "로그인 에러",
        status: finalResult.status,
        result: finalResult.result,
        admin: null,
      });
    }
  }
  catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: "error",
      msg: err.toString(),
      error: err.toString(),
    });
  }
});

// 2-2. signup -------------------------------------------------------------------------------------
router.post("/signup", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.signup (
      req.body.OBJECT as any,
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "회원가입 성공",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "alreadyExist") {
      res.json({
        msg: "이미 존재하는 아이디입니다.",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "회원가입 실패",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else {
      res.json({
        msg: "회원가입 에러",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
  }
  catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: "error",
      msg: err.toString(),
      error: err.toString(),
    });
  }
});