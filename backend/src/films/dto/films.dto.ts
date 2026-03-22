//TODO описать DTO для запросов к /films
// Один фильм
export class FilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about: string;
  description: string;
  image: string;
  cover: string;
}

// Ответ списка фильмов
export class FilmsResponseDto {
  total: number;
  items: FilmDto[];
}

// Один сеанс фильма
export class ScheduleItemDto {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

// Ответ расписания
export class ScheduleResponseDto {
  total: number;
  items: ScheduleItemDto[];
}

// Параметры (id из URL)
export class FilmParamsDto {
  id: string;
}
