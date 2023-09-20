import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  save(@Body() item: CreateItemDto) {
    return this.itemService.save(item);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllMouth(@Query() data: any) {
    return this.itemService.findAllMouth(data.mouth);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
