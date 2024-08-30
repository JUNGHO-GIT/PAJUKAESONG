// aboutRouter.ts

import express from "express";
import * as service from "@services/about/aboutService";
export const router = express.Router();

// 0. location -------------------------------------------------------------------------------------
router.get("/location", async (req, res) => {
  try {
    // 쿼리 파라미터에서 place_id를 가져옴
    const placeId = req.query.place_id as string;

    // aboutService의 location 메서드를 호출하여 데이터 가져오기
    const result = await service.location(placeId);

    if (result) {
      res.json({
        status: "success",
        msg: "searchSuccessful",
        result: result,
      });
    } else {
      res.json({
        status: "fail",
        msg: "searchFailed",
        result: null,
      });
    }
  }
  catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: "error",
      error: err.toString(),
    });
  }
});
