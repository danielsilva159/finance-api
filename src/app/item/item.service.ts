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

  findAllMouth(data: any) {
    return this.itemRepository.query(`SELECT *
    FROM public.item where EXTRACT(MONTH from data) = ${data.mouth} and EXTRACT(YEAR from data) = ${data.year} and "userId" = '${data.id}'  ORDER BY id ASC`);
  }

  private findOne(id: number) {
    return this.itemRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const item = this.findOne(id);
    if (!item) throw new Error('Esse item não existe');
    await this.itemRepository.delete({ id });
  }
  async saveSeveralOnce(createItemDto: CreateItemDto) {
    if (createItemDto.installments > 11) {
      throw new Error('numero de parcela não pode ser maior que 11');
    }
    await this.save(createItemDto);
    const mes = new Date(createItemDto.data).getMonth();
    createItemDto.data = new Date(createItemDto.data);
    createItemDto.data.setMonth(mes + 1);
    console.log(createItemDto);
    if (createItemDto.data.getMonth() < createItemDto.installments) {
      delete createItemDto.id;
      this.saveSeveralOnce(createItemDto);
    }
  }
}
