// index.ts

import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";

import { router as adminRouter } from "@routers/adminRouter";
import { router as aboutRouter } from "@routers/aboutRouter";
import { router as contactRouter } from "@routers/contactRouter";
import { router as franchiseRouter } from "@routers/franchiseRouter";
import { router as menuRouter } from "@routers/menuRouter";
import { router as noticeRouter } from "@routers/noticeRouter";
import { router as orderRouter } from "@routers/orderRouter";
import { router as productRouter } from "@routers/productRouter";
import { router as userRouter } from "@routers/userRouter";

// -------------------------------------------------------------------------------------------------
dotenv.config();
const app = express();
const preFix = process.env.HTTP_PREFIX || "";

// 서버 포트 설정 ----------------------------------------------------------------------------------
const httpPort = Number(process.env.HTTP_PORT);
const httpsPort = Number(process.env.HTTPS_PORT);

(function start(httpPort: number, httpsPort: number) {
  try {
    const httpServer = app.listen(httpPort, () => {
      console.log(`HTTP 서버가 포트 ${httpPort}에서 실행 중입니다.`);
    });
    httpServer.on('error', (err: any) => {
      if (err?.code === 'EADDRINUSE') {
        console.log(`${httpPort} 포트가 이미 사용 중입니다. 다른 포트로 변경합니다.`);
        start(httpPort + 1, httpsPort);
      }
      else {
        console.error(`서버 실행 중 오류 발생: ${err}`);
      }
    });
  }
  catch (err: any) {
    console.error(`서버 실행 중 오류 발생: ${err}`);
  }
})(httpPort, httpsPort);

// MongoDB 설정 ------------------------------------------------------------------------------------
const id = process.env.DB_USER;
const pw = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db = process.env.DB_NAME
// const db = process.env.DB_TEST
const envStr = db === process.env.DB_TEST ? "DEVELOPMENT" : "PRODUCTION";

mongoose.connect(`mongodb://${id}:${pw}@${host}:${port}/${db}`)
.then(() => {
  console.log(`[${envStr}] MongoDB 연결 성공 [${db}]`);
})
.catch((err: any) => {
  console.error(`[${envStr}] MongoDB 연결 실패 [${db}] ${err}`);
});

// 미들웨어 설정 -----------------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
  maxAge: 3600,
  optionsSuccessStatus: 204,
  preflightContinue: false,
}));

// 라우터 설정 -------------------------------------------------------------------------------------
app.use(`${preFix}/admin`, adminRouter);
app.use(`${preFix}/about`, aboutRouter);
app.use(`${preFix}/contact`, contactRouter);
app.use(`${preFix}/franchise`, franchiseRouter);
app.use(`${preFix}/menu`, menuRouter);
app.use(`${preFix}/notice`, noticeRouter);
app.use(`${preFix}/order`, orderRouter);
app.use(`${preFix}/product`, productRouter);
app.use(`${preFix}/user`, userRouter);

// 에러 처리 미들웨어 ------------------------------------------------------------------------------
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
  });
});