import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  IsInt,
  Min,
  IsDate,
} from 'class-validator';

// Один фильм
export class FilmDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsNumber()
  rating: number;

  @Expose()
  @IsString()
  director: string;

  @Expose()
  @IsArray()
  tags: string[];

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  about: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  image: string;

  @Expose()
  @IsString()
  cover: string;
}

// Ответ списка фильмов
export class FilmsResponseDto {
  @Expose()
  @IsInt()
  total: number;

  @Expose()
  @Type(() => FilmDto)
  items: FilmDto[];
}

// Один сеанс фильма
export class ScheduleItemDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @Type(() => Date)
  @IsDate()
  daytime: Date;

  @Expose()
  @IsInt()
  hall: number;

  @Expose()
  @IsInt()
  @Min(1)
  rows: number;

  @Expose()
  @IsInt()
  @Min(1)
  seats: number;

  @Expose()
  @IsNumber()
  @Min(0)
  price: number;

  @Expose()
  @IsArray()
  taken: string[];
}

// Ответ расписания
export class ScheduleResponseDto {
  @Expose()
  @IsInt()
  total: number;

  @Expose()
  @Type(() => ScheduleItemDto)
  items: ScheduleItemDto[];
}
