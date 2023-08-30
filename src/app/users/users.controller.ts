import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/loginUserDto';
import { CreateUserDto } from './dto/createUserDto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return await this.usersService.login(req.user);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.usersService.create(body);
  }
}
