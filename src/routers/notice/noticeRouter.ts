// router.ts

import express from "express";
import { Request, Response } from "express";
import * as service from "@services/notice/noticeService";
export const router = express.Router();

// 1. list -----------------------------------------------------------------------------------------
router.get("/list", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.list(
      req.query.PAGING as any,
    );
    if (finalResult.status === "success") {
      res.json({
        status: "success",
        msg: "조회 성공",
        result: finalResult.result,
      });
    }
    else if (finalResult.status === "fail") {
      res.json({
        status: "fail",
        msg: "조회 실패",
        result: null,
      });
    }
    else {
      res.json({
        status: "error",
        msg: "조회 에러",
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

// 2. detail ---------------------------------------------------------------------------------------
router.get("/detail", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.detail(
      req.query.user_id as string,
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
      error: err.toString()
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
    if (finalResult) {
      res.json({
        status: "success",
        msg: "저장 성공",
        result: finalResult,
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "저장 실패",
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

// 4. update ---------------------------------------------------------------------------------------
router.put("/update", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.update(
      req.body.user_id as string,
      req.body._id as string,
      req.body.OBJECT as any,
    );
    if (finalResult) {
      res.json({
        status: "success",
        msg: "수정 성공",
        result: finalResult,
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "수정 실패",
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

// 5. deletes --------------------------------------------------------------------------------------
router.delete("/deletes", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.deletes(
      req.body.user_id as string,
      req.body._id as string,
    );
    if (finalResult) {
      res.json({
        status: "success",
        msg: "삭제 성공",
        result: finalResult,
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "삭제 실패",
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