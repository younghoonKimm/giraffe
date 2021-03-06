import { NestMiddleware, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "./jwt.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JWTMiddlewares implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ("x-jwt" in req.headers) {
      const token = req.headers["x-jwt"];

      try {
        const decoded = this.jwtService.verify(token.toString());

        if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
          const id = decoded["id"];
          const { user, ok } = await this.userService.findById(id);
          if (ok) {
            req["user"] = user;
          }
        }
      } catch (e) {}
    }
    next();
  }
}
