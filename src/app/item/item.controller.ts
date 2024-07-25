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
  Request,
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
    if (item.id) {
      return this.itemService.save(item);
    }
    return this.itemService.saveSeveralOnce(item);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllMouth(@Query() data: any) {
    return this.itemService.findAllMouth(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
