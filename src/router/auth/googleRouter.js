// googleRouter.js

import express from "express";
import * as service from "../../service/auth/googleService.js";
export const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

// 1. login ----------------------------------------------------------------------------------------
router.get("/login", async (req, res) => {
  try {
    let result = await service.login();
    if (result) {
      // Google 로그인 페이지로 리디렉트 url 리턴
      res.json({
        status: "success",
        msg: "인증 URL 생성 성공",
        url: result.url
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "인증 URL 생성 실패"
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

// 2. callback -------------------------------------------------------------------------------------
router.get("/callback", async (req, res) => {
  try {
    let result = await service.callback(
      req.query.code
    );
    if (result.status === "success") {
      res.redirect(result.url);
    }
    else {
      res.json({
        status: "fail",
        msg: "콜백 실패"
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

// 3. afterCallback --------------------------------------------------------------------------------
router.get("/afterCallback", async (req, res) => {
  try {
    let result = await service.afterCallback();
    if (result) {
      res.json({
        status: "success",
        msg: "구글로그인 정보 세션 저장 성공",
        result: result.result,
        admin: result.admin,
        googleId: result.googleId,
        googlePw: result.googlePw,
      });
    }
    else {
      res.json({
        status: "fail",
        msg: "구글로그인 정보 세션 저장 실패"
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