import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FilmsRepository } from '../repository/films.repository';
import {
  FilmItemDto,
  FilmsResponseDto,
  ScheduleItemDto,
  ScheduleResponseDto,
} from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmsResponseDto> {
    const films = await this.filmsRepository.findAll();

    const items = plainToInstance(FilmItemDto, films, {
      excludeExtraneousValues: true,
    });

    return plainToInstance(
      FilmsResponseDto,
      {
        total: items.length,
        items,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findScheduleById(id: string): Promise<ScheduleResponseDto> {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }

    const items = plainToInstance(ScheduleItemDto, film.schedule, {
      excludeExtraneousValues: true,
    });

    return plainToInstance(
      ScheduleResponseDto,
      {
        total: items.length,
        items,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
