import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import {
  FilmParamsDto,
  FilmsResponseDto,
  ScheduleResponseDto,
} from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): FilmsResponseDto {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findSchedule(@Param() params: FilmParamsDto): ScheduleResponseDto {
    return this.filmsService.findScheduleById(params.id);
  }
}