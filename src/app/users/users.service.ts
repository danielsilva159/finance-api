import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUserDto';
import { CreateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async create(body: CreateUserDto): Promise<Partial<CreateUserDto>> {
    body.password = await bcrypt.hash(body.password, 10);
    const user = await this.findUseEmail(body.email);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'Esse e-mail ja existe na base de dados',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.save(this.userRepository.create(body));
    return {
      ...body,
      password: undefined,
    };
  }
  login(body: LoginUserDto) {
    const payload = { email: body.email, sub: body.id, name: body.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUseEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findUseEmail(email);
    const pass = bcrypt.compare(password, user.password);
    if (user && pass) {
      const result: LoginUserDto = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      return result;
    }
    return null;
  }
}
