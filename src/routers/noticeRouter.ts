// noticeRouter.ts

import express, { Request, Response } from "express";
import { uploadMemory } from "@assets/scripts/upload";
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

// 2. detail ---------------------------------------------------------------------------------------
router.get("/detail", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.detail(
      req.query._id as string
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

// 3. save -----------------------------------------------------------------------------------------
router.post("/save", uploadMemory("fileList", "array", 5), async (req: Request, res: Response) => {
  try {
    let finalResult = await service.save(
      req.body.OBJECT as any,
      req.files as Express.Multer.File[]
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
        result: finalResult.result,
      });
    }
    else {
      res.json({
        msg: "저장 에러",
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

// 4. update ---------------------------------------------------------------------------------------
router.put("/update", uploadMemory("fileList", "array", 5), async (req: Request, res: Response) => {
  try {
    let finalResult = await service.update(
      req.body._id as string,
      req.body.OBJECT as any,
      req.files as Express.Multer.File[]
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
        result: finalResult.result,
      });
    }
    else {
      res.json({
        msg: "수정 에러",
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

// 5. delete ---------------------------------------------------------------------------------------
router.delete("/delete", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.deletes(
      req.query._id as string
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
        result: finalResult.result,
      });
    }
    else {
      res.json({
        msg: "삭제 에러",
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