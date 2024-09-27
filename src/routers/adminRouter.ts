// adminRouter.ts

import express, { Request, Response } from "express";
import * as service from "@services/adminService";
export const router = express.Router();

// 0. visit ----------------------------------------------------------------------------------------
router.get("/visit", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.visit(
      req as any,
      req.query.date as string,
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
        result: finalResult.result,
      });
    }
    else {
      res.json({
        msg: "조회 에러",
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