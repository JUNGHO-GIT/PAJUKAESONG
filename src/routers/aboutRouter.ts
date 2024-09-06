// aboutRouter.ts

import express from "express";
import { Request, Response } from "express";
import * as service from "@services/aboutService";
export const router = express.Router();

// 1-2. greeting -----------------------------------------------------------------------------------
router.get("/greeting", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.greeting(
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "조회 성공",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "조회 실패",
        status: finalResult.status,
        result: null,
      });
    }
    else {
      res.json({
        msg: "조회 에러",
        status: finalResult.status,
        result: null,
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

// 2-2. introduce ----------------------------------------------------------------------------------
router.get("/introduce", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.introduce(
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "조회 성공",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "조회 실패",
        status: finalResult.status,
        result: null,
      });
    }
    else {
      res.json({
        msg: "조회 에러",
        status: finalResult.status,
        result: null,
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

// 3-2. location -----------------------------------------------------------------------------------
router.get("/location", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.location(
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "조회 성공",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "조회 실패",
        status: finalResult.status,
        result: null,
      });
    }
    else {
      res.json({
        msg: "조회 에러",
        status: finalResult.status,
        result: null,
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