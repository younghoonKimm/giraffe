import { Resolver, Mutation, Args, Query, Subscription } from "@nestjs/graphql";
import { Order } from "./entities/order.entity";
import { OrderService } from "./orders.service";
import { CreateOrderOutput, CreateOrderInput } from "./dtos/create-order.dtos";
import { AuthUser } from "src/auth/auth-user.decorator";
import { User } from "src/users/entities/user.entity";
import { Role } from "src/auth/role.decorator";
import { GetOrdersOutput, GetOrdersInput } from "./dtos/get-orders.dto";
import { GetOrderInput, GetOrderOutput } from "./dtos/get-order.dto";
import { EditOrderOutput, EditOrderInput } from "./dtos/edit-order.dto";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => CreateOrderOutput)
  @Role(["Client"])
  async createOrder(
    @AuthUser() customer: User,
    @Args("input")
    createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderInput);
  }

  @Query(() => GetOrdersOutput)
  @Role(["Any"])
  async getOrders(
    @AuthUser() user: User,
    @Args("input") getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(user, getOrdersInput);
  }

  @Query(() => GetOrderOutput)
  @Role(["Any"])
  async getOrder(
    @AuthUser() user: User,
    @Args("input") getOrderInput: GetOrderInput,
  ): Promise<GetOrderOutput> {
    return this.orderService.getOrder(user, getOrderInput);
  }

  @Mutation(() => EditOrderOutput)
  @Role(["Any"])
  async editOrder(
    @AuthUser() user: User,
    @Args("input") editOrderInput: EditOrderInput,
  ): Promise<EditOrderOutput> {
    return this.orderService.editOrder(user, editOrderInput);
  }

  @Mutation(() => Boolean)
  potatoReady() {
    pubsub.publish("hotPotatos", {
      readyPotato: "YOur potato is ready. love you.",
    });
    return true;
  }

  @Subscription(() => String)
  @Role(["Any"])
  readyPotato(@AuthUser() user: User) {
    console.log(user);
    return pubsub.asyncIterator("hotPotatos");
  }
}
