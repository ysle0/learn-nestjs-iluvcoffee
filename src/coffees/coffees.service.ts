import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private readonly coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
    {
      id: 2,
      name: 'Cheeky Breeky Ale',
      brand: 'Buddy Brew',
      flavors: ['blood', 'sweat'],
    },
    {
      id: 3,
      name: 'K-lager',
      brand: 'Buddy Brew',
      flavors: ['piss', 'piss'],
    },
    {
      id: 4,
      name: 'Limonaed',
      brand: 'Orchidman',
      flavors: ['sweat', 'water', 'lemon zest'],
    },
    {
      id: 5,
      name: 'Cola Coca',
      brand: 'CC',
      flavors: ['pot', 'water', 'sugar (not BTS)'],
    },
  ];

  findAll(): readonly Coffee[] {
    return this.coffees;
  }

  findAllWithPagination(paginationQuery: any): readonly Coffee[] {
    let { limit, offset } = paginationQuery;

    offset = +offset;
    limit = +limit;

    // 2 contents at page 1
    const start = (offset - 1) * limit;
    const end = start + limit;

    return this.coffees.slice(start, end);
  }

  findOne(id: string): Coffee | null {
    const idAsNum = Number.parseInt(id);
    if (!Number.isInteger(idAsNum)) return null;

    const coffee = this.coffees.find((e) => e.id === idAsNum);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
  }

  update(id: string, updateDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      const idAsNum = Number.parseInt(id);
      const updateIdx = this.coffees.findIndex((e) => e.id === idAsNum);

      // this.coffees[updateIdx] = {
      //   ...dto,
      //   id: existingCoffee.id,
      // };
    }
  }

  create(createDto: CreateCoffeeDto) {
    this.coffees.push({
      ...createDto,
      id: this.coffees.length + 1,
    });
  }

  delete(id: string) {
    const coffeeIndex = this.coffees.findIndex(
      (c) => c.id === Number.parseInt(id),
    );
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }

  private isCoffeeExisting(id: string): boolean {
    return this.coffees.findIndex((e) => e.id === +id) !== -1;
  }
}
