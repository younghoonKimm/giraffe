import { InputType, ObjectType, PickType, Field, Int } from "@nestjs/graphql";
import { Restaurant } from "../entities/restaurant.entity";
import { CoreOutput } from "src/common/dto/output.dto";

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  "name",
  "coverImg",
  "address",
]) {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field(() => Int)
  restaurantId?: number;
}
