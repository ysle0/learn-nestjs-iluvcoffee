import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): readonly Coffee[] {
    return this.coffeeService.findAll();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllWithPaginationQuery(@Query() paginationQuery): readonly Coffee[] {
    return this.coffeeService.findAllWithPagination(paginationQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateCoffeeDto) {
    console.log(createDto instanceof CreateCoffeeDto);
    return this.coffeeService.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeeService.delete(id);
  }
}
