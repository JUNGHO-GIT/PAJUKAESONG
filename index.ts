// index.ts

import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { router as aboutGreetingRouter } from "@routers/about/aboutGreetingRouter";
import { router as aboutIntroduceRouter } from "@routers/about/aboutIntroduceRouter";
import { router as aboutLocationRouter } from "@routers/about/aboutLocationRouter";

import { router as contactInquiryRouter } from "@routers/contact/contactInquiryRouter";
import { router as contactLookupRouter } from "@routers/contact/contactLookupRouter";

import { router as franchiseBranchRouter } from "@routers/franchise/franchiseBranchRouter";
import { router as franchiseInquiryRouter } from "@routers/franchise/franchiseInquiryRouter";

import { router as menuMainRouter } from "@routers/menu/menuMainRouter";
import { router as menuSubRouter } from "@routers/menu/menuSubRouter";

import { router as noticeRouter } from "@routers/notice/noticeRouter";

import { router as orderBuyRouter } from "@routers/order/orderBuyRouter";
import { router as orderLookupRouter } from "@routers/order/orderLookupRouter";

import { router as userRouter } from "@routers/user/userRouter";

// -------------------------------------------------------------------------------------------------
dotenv.config();
const app = express();
const preFix = process.env.HTTP_PREFIX || "";

// MongoDB 설정 ------------------------------------------------------------------------------------
const id = process.env.DB_USER;
const pw = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT || '27017';
const db = process.env.DB_NAME;

mongoose.connect(`mongodb://${id}:${pw}@${host}:${port}/${db}`)
  .then(() => {
    console.log('MongoDB 연결 성공');
  })
  .catch((error) => {
    console.error(`MongoDB 연결 실패: ${error}`);
  });

// 서버 포트 설정 ----------------------------------------------------------------------------------
const httpPort = Number(process.env.HTTP_PORT) || 4100;
const httpsPort = Number(process.env.HTTPS_PORT) || 443;

function startServer(httpPort: number, httpsPort: number) {
  try {
    const httpServer = app.listen(httpPort, () => {
      console.log(`HTTP 서버가 포트 ${httpPort}에서 실행 중입니다.`);
    });
    httpServer.on('error', (error: any) => {
      if (error?.code === 'EADDRINUSE') {
        console.log(`${httpPort} 포트가 이미 사용 중입니다. 다른 포트로 변경합니다.`);
        startServer(httpPort + 1, httpsPort);
      }
      else {
        console.error(`서버 실행 중 오류 발생: ${error}`);
      }
    });
  }
  catch (error) {
    console.error(`서버 실행 중 오류 발생: ${error}`);
  }
}
startServer(httpPort, httpsPort);

// 미들웨어 설정 -----------------------------------------------------------------------------------
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((req, res, next) => {
  res.set("Content-Type", "application/json; charset=utf-8");
  next();
});

// 라우터 설정 -------------------------------------------------------------------------------------
app.use(`${preFix}/about/greeting`, aboutGreetingRouter);
app.use(`${preFix}/about/introduce`, aboutIntroduceRouter);
app.use(`${preFix}/about/location`, aboutLocationRouter);

app.use(`${preFix}/contact/inquiry`, contactInquiryRouter);
app.use(`${preFix}/contact/lookup`, contactLookupRouter);

app.use(`${preFix}/franchise/branch`, franchiseBranchRouter);
app.use(`${preFix}/franchise/inquiry`, franchiseInquiryRouter);

app.use(`${preFix}/menu/main`, menuMainRouter);
app.use(`${preFix}/menu/sub`, menuSubRouter);

app.use(`${preFix}/notice`, noticeRouter);

app.use(`${preFix}/order/buy`, orderBuyRouter);
app.use(`${preFix}/order/lookup`, orderLookupRouter);

app.use(`${preFix}/user`, userRouter);