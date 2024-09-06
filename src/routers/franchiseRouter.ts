// franchiseRouter.ts

import express from "express";
import { Request, Response } from "express";
import * as service from "@services/franchiseService";
export const router = express.Router();

// 1-1. list ---------------------------------------------------------------------------------------
router.get("/list/branch", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.listBranch(
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

// 2-1. detail -------------------------------------------------------------------------------------
router.get("/detail/branch", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.detailBranch(
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

// 3-1. save ---------------------------------------------------------------------------------------
router.post("/save/branch", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.saveBranch(
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

// 3-2. save ---------------------------------------------------------------------------------------
router.post("/save/inquiry", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.saveInquiry(
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

// 4-1. update -------------------------------------------------------------------------------------
router.put("/update/branch", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.updateBranch(
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

// 4-2. update -------------------------------------------------------------------------------------
router.put("/update/inquiry", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.updateInquiry(
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

// 5-1. deletes ------------------------------------------------------------------------------------
router.delete("/delete/branch", async (req: Request, res: Response) => {
  try {
    console.log(req);
    let finalResult = await service.deletesBranch(
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

// 5-2. deletes ------------------------------------------------------------------------------------
router.delete("/delete/inquiry", async (req: Request, res: Response) => {
  try {
    let finalResult = await service.deletesInquiry(
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