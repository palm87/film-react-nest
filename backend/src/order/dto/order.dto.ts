import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

// То, что приходит в запросе (один билет)
export class CreateOrderItemDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsOptional()
  @IsString()
  daytime?: string;

  @IsOptional()
  @IsString()
  day?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  row: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  seat: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  tickets: CreateOrderItemDto[];
}

// Ответ (один билет с id)
export class OrderItemDto {
  id: string;
  film: string;
  session: string;
  daytime?: string;
  day?: string;
  time?: string;
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