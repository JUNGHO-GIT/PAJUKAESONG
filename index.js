// index.ts

import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";

import { aboutRouter } from "./router/about/aboutRouter.ts";

// -------------------------------------------------------------------------------------------------
dotenv.config();
const app = express();

// MongoDB 설정 ------------------------------------------------------------------------------------
const id = process.env.DB_USER;
const pw = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT || '27017';
const db = process.env.DB_NAME;
mongoose.connect(`mongodb://${id}:${pw}@${host}:${port}/${db}`);

// 서버 포트 설정 ----------------------------------------------------------------------------------
const httpPort = Number(process.env.HTTP_PORT) || 4100;
const httpsPort = Number(process.env.HTTPS_PORT) || 443;

/**
 * @param {number} httpPort
 * @param {number} httpsPort
 */
function startServer(httpPort, httpsPort) {
  try {
    const httpServer = app.listen(httpPort, () => {
      console.log(`HTTP 서버가 포트 ${httpPort}에서 실행 중입니다.`);
    });
    httpServer.on('error', (error) => {
      // @ts-ignore
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
// app.use(morgan('dev'));
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

app.use("/about", aboutRouter);