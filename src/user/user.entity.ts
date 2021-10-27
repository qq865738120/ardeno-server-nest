import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
