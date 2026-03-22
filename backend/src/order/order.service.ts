import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderItemDto, OrderResponseDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(orderItems: CreateOrderItemDto[]): Promise<OrderResponseDto> {
    if (!orderItems.length) {
      throw new BadRequestException('Заказ не содержит билетов');
    }

    const bookedItems = [];

    for (const item of orderItems) {
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

      bookedItems.push({
        id: crypto.randomUUID(),
        ...item,
      });

      await this.filmsRepository.save(film);
    }

    return {
      total: bookedItems.length,
      items: bookedItems,
    };
  }
}