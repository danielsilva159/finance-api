import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { ItemEntity } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}
  async create(createItemDto: CreateItemDto) {
    return await this.itemRepository.save(createItemDto);
  }

  findAllMouth(mouth: string) {
    return this.itemRepository
      .query(`SELECT id, nome, data, tipo, valor, created_at, updated_at, deleted_at
    FROM public.item where EXTRACT(MONTH from data) = ${mouth}`);
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
