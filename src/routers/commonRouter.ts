// commonRouter.ts

import express from "express";
import { Request, Response } from "express";
import * as service from "@services/commonService";
export const commonRouter = express.Router();

// 1. main -----------------------------------------------------------------------------------------
commonRouter.get("/main", async (req: Request, res: Response) => {
  try {
    let result = await service.main (
      req.query.user_id as string,
      req.query.DATE as Record<string, any>,
    );
    if (result) {
      res.json({
        status: "success",
        msg: "searchSuccessful",
        result: result,
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "searchFailed",
        result: null,
      });
    }
  }
  catch (err: any) {
    res.status(500).json({
      status: "error",
      error: err
    });
  }
});