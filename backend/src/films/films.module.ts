// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { FilmsController } from './films.controller';
// import { FilmsService } from './films.service';
// import { FilmsRepository } from '../repository/films.repository';
// import { Film, FilmSchema } from './schemas/film.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
//   ],
//   controllers: [FilmsController],
//   providers: [FilmsService, FilmsRepository],
// })
// export class FilmsModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
