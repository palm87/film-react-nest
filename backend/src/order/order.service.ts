import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto, OrderItemDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(orderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const tickets = orderDto.tickets;

    const bookedItems: OrderItemDto[] = [];

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
      await this.filmsRepository.addTakenPlace(item.film, item.session, place);
      bookedItems.push({
      id: randomUUID(),
      film: item.film,
      session: item.session,
      daytime: item.daytime ?? `${item.day} ${item.time}`,
      row: item.row,
      seat: item.seat,
      price: item.price,
      });
    }

    return {
      total: bookedItems.length,
      items: bookedItems,
    };
  }
}
