import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async addTakenPlace(
    filmId: string,
    sessionId: string,
    place: string,
  ): Promise<boolean> {
    const session = await this.scheduleRepository.findOne({
      where: {
        id: sessionId,
        filmId,
      },
    });

    if (!session) {
      return false;
    }

    session.taken = [...session.taken, place];
    const result = await this.scheduleRepository.save(session);

    return !!result;
  }
}
