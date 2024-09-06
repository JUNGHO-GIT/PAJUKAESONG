// router.ts

import express from "express";
import { Request, Response } from "express";
import * as service from "@services/noticeService";
export const router = express.Router();

// 1. list -----------------------------------------------------------------------------------------
router.get("/list", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.list(
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
        result: null,
        totalCnt: null,
      });
    }
    else {
      res.json({
        msg: "조회 에러",
        status: finalResult.status,
        result: null,
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

// 2. detail ---------------------------------------------------------------------------------------
router.get("/detail", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.detail(
      req.query._id as string,
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

// 3. save -----------------------------------------------------------------------------------------
router.post("/save", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.save(
      req.body.user_id as string,
      req.body.OBJECT as any,
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "저장 성공",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "저장 실패",
        status: finalResult.status,
        result: null,
      });
    }
    else {
      res.json({
        msg: "저장 에러",
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

// 4. update ---------------------------------------------------------------------------------------
router.put("/update", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.update(
      req.body.user_id as string,
      req.body._id as string,
      req.body.OBJECT as any,
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "수정 성공",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "수정 실패",
        status: finalResult.status,
        result: null,
      });
    }
    else {
      res.json({
        msg: "수정 에러",
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

// 5. deletes --------------------------------------------------------------------------------------
router.delete("/deletes", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.deletes(
      req.body.user_id as string,
      req.body._id as string,
    );
    if (finalResult.status === "success") {
      res.json({
        msg: "삭제 성공",
        status: finalResult.status,
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        msg: "삭제 실패",
        status: finalResult.status,
        result: null,
      });
    }
    else {
      res.json({
        msg: "삭제 에러",
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