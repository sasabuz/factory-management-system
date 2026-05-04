import { Request, Response, NextFunction } from "express";

export const verifyRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized- user missing" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden - access denied" });
    }

    next();
  };
};
