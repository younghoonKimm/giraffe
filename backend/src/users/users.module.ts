import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { Verification } from "./entities/verification.entity";
import { Order } from "src/orders/entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification, Order])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
