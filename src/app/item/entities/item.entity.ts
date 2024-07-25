import { UserEntity } from 'src/app/users/users.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'item' })
export class ItemEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'timestamp' })
  data: Date;

  @Column({ nullable: false, type: 'integer' })
  tipo: number;

  @Column({ nullable: false, type: 'decimal' })
  valor: number;

  @Column({ default: false })
  pago: boolean;

  @ManyToOne(() => UserEntity, (user) => user.itens)
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleteAt: string;
}
