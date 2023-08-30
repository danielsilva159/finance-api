import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './app/users/users.entity';
import { ItemModule } from './app/item/item.module';
import { ItemEntity } from './app/item/entities/item.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'finance',
      synchronize: true,
      entities: [UserEntity, ItemEntity],
    }),
    UsersModule,
    ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
