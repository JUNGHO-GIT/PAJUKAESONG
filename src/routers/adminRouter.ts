// adminRouter.ts

import express, { Request, Response } from "express";
import * as service from "@services/adminService";
export const router = express.Router();

// 0. appInfo --------------------------------------------------------------------------------------
router.get("/appInfo", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.appInfo();
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

// 1-0. visit (count) ------------------------------------------------------------------------------
router.get("/visitCount", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.visitCount(
      req.query.DATE as string,
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
        totalCnt: null,
      });
    }
    else {
      res.json({
        msg: "조회 에러",
        status: finalResult.status,
        result: finalResult.result,
        totalCnt: null,
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

// 1-3. visit (save) -------------------------------------------------------------------------------
router.get("/visitSave", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.visitSave(
      req as any,
      req.query.DATE as string,
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

// 2-1. contact (list) -----------------------------------------------------------------------------
router.get("/contactList", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.contactList(
      req.query.PAGING as any,
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "조회 성공",
        status: finalResult.status,
        result: finalResult.result,
        totalCnt: finalResult.totalCnt,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "조회 실패",
        status: finalResult.status,
        result: finalResult.result,
        totalCnt: null,
      });
    }
    else {
      res.json({
        msg: "조회 에러",
        status: finalResult.status,
        result: finalResult.result,
        totalCnt: null,
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

// 3-1. order (list) -------------------------------------------------------------------------------
router.get("/orderList", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.orderList(
      req.query.DATE as string,
      req.query.PAGING as any,
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "조회 성공",
        status: finalResult.status,
        result: finalResult.result,
        totalCnt: finalResult.totalCnt,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "조회 실패",
        status: finalResult.status,
        result: finalResult.result,
        totalCnt: null,
      });
    }
    else {
      res.json({
        msg: "조회 에러",
        status: finalResult.status,
        result: finalResult.result,
        totalCnt: null,
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