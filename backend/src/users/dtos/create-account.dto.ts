import { PickType, ObjectType, Field, InputType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { CoreOutput } from "src/common/dto/output.dto";

@InputType()
export class CreateAccountInput extends PickType(User, [
  "email",
  "password",
  "role",
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
