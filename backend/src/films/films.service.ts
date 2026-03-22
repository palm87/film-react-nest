import { Injectable } from '@nestjs/common';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  findAll(): FilmsResponseDto {
    return {
      total: 0,
      items: [],
    };
  }

  findScheduleById(id: string): ScheduleResponseDto {
    console.log('Requested film schedule for film id:', id);

    return {
      total: 0,
      items: [],
    };
  }
}