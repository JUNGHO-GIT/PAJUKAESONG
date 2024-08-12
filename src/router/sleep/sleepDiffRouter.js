// router.js

import express from "express";
import * as service from "../../service/sleep/sleepDiffService.js";
import * as middleware from "../../middleware/sleep/sleepDiffMiddleware.js";
export const router = express.Router();

// 1. list (리스트는 gte lte) ----------------------------------------------------------------------
router.get("/list", async (req, res) => {
  try {
    let result = await service.list(
      req.query.user_id,
      req.query.PAGING,
      req.query.DATE
    );
    result = await middleware.list(result);
    if (result && result.result) {
      res.json({
        status: "success",
        msg: "조회 성공",
        totalCnt: result.totalCnt,
        result: result.result
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "조회 실패",
        totalCnt: 0,
        result: null
      });
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      error: err.toString()
    });
  }
});