//TODO реализовать DTO для /orders
// То, что приходит в запросе (один билет)
export class CreateOrderItemDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

// Ответ (один билет с id)
export class OrderItemDto {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

// Ответ сервера
export class OrderResponseDto {
  total: number;
  items: OrderItemDto[];
}

// Ошибка
export class OrderErrorDto {
  error: string;
}