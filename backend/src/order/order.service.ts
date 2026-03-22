import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  create(orderItems: CreateOrderItemDto[]): OrderResponseDto {
    return {
      total: orderItems.length,
      items: orderItems.map((item, index) => ({
        id: String(index + 1),
        ...item,
      })),
    };
  }
}