import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(orderDto: CreateOrderDto) {
    const tickets = orderDto.tickets;

    if (!Array.isArray(tickets) || tickets.length === 0) {
      throw new BadRequestException('Заказ не содержит билетов');
    }

    const bookedItems = [];

    for (const item of tickets) {
      const film = await this.filmsRepository.findById(item.film);

      if (!film) {
        throw new NotFoundException(`Фильм с id ${item.film} не найден`);
      }

      const session = film.schedule.find(
        (scheduleItem) => scheduleItem.id === item.session,
      );

      if (!session) {
        throw new NotFoundException(`Сеанс с id ${item.session} не найден`);
      }

      const place = `${item.row}:${item.seat}`;

      if (session.taken.includes(place)) {
        throw new BadRequestException(
          `Место ${place} уже занято на сеансе ${item.session}`,
        );
      }

      session.taken.push(place);
      await this.filmsRepository.save(film);

      bookedItems.push({
        id: randomUUID(),
        ...item,
      });
    }

    return {
      total: bookedItems.length,
      items: bookedItems,
    };
  }
}