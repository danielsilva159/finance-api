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
  async save(createItemDto: CreateItemDto) {
    return await this.itemRepository.save(createItemDto);
  }

  findAllMouth(mouth: string) {
    return this.itemRepository.query(`SELECT *
    FROM public.item where EXTRACT(MONTH from data) = ${mouth} ORDER BY id ASC`);
  }

  private findOne(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const item = this.findOne(id);
    if (!item) throw new Error('Esse item não existe');
    await this.itemRepository.delete({ id });
  }
}
