import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll() {
    return this.filmModel.find().exec();
  }

  async findById(id: string) {
    return this.filmModel.findOne({ id }).exec();
  }
  async addTakenPlace(
    filmId: string,
    sessionId: string,
    place: string,
  ): Promise<boolean> {
    const result = await this.filmModel.updateOne(
      {
        id: filmId,
        'schedule.id': sessionId,
      },
      {
        $push: {
          'schedule.$.taken': place,
        },
      },
    );

    return result.modifiedCount > 0;
  }
  
}
