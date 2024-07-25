import { CreateUserDto } from 'src/app/users/dto/createUserDto';

export class CreateItemDto {
  id: number;
  nome: string;
  data: Date;
  tipo: number;
  valor: number;
  user: CreateUserDto;
  installments: number;
}
