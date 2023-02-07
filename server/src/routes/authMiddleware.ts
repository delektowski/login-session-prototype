import { NextFunction, Request, Response } from "express";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(200).json({
      message: "You are not authorized!",
      status: 401,
      isAuth: false,
      isAdmin: false,
    });
  }
}
