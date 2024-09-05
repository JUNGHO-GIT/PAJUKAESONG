// aboutIntroduceRouter.ts

import express from "express";
import { Request, Response } from "express";
import * as service from "@services/about/aboutIntroduceService";
export const router = express.Router();

// 2. detail ---------------------------------------------------------------------------------------
router.get("/detail", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.detail (
    );
    if (finalResult) {
      res.json({
        status: "success",
        msg: "조회 성공",
        result: finalResult,
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "조회 실패",
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