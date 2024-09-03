// contactRouter.ts

import express from "express";
import { Request, Response } from "express";
import contactService from "@services/contact/contactService";
export const contactRouter = express.Router();

// 1. main -----------------------------------------------------------------------------------------
contactRouter.get("/main", async (req: Request, res: Response) => {
  try {
    let result = await contactService.main (
      req.query.user_id as string,
      req.query.DATE as Record<string, any>,
    );
    if (result) {
      res.json({
        status: "success",
        msg: "searchSuccessful",
        result: result,
      });
    }
    else {
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
      error: err.toString()
    });
  }
});