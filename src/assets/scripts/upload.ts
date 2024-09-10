// upload.ts

import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import multer from 'multer';
import { fileURLToPath } from "url";

// uploads 폴더 경로 설정 --------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../uploads/");

// multer 설정 -------------------------------------------------------------------------------------
const storage = multer.diskStorage({

  // 파일 저장 경로 설정
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  // 파일명 설정
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// 1. upload ---------------------------------------------------------------------------------------
// upload 오버라이드 해서 함수화하기
export const uploadFile = (fileName: string, type: string, limit: number) => {

  // multer 설정
  if (type === "single") {
    return multer({ storage: storage }).single(fileName);
  }
  else if (type === "array") {
    return multer({ storage: storage }).array(fileName, limit);
  }
  else {
    throw new Error("Invalid upload type");
  }
};

// 2. delete ---------------------------------------------------------------------------------------
export const deleteFile = (filePath: string) => {
  // 파일 삭제
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
};