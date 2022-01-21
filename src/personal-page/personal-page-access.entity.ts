import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('personal-page-access')
export class PersonalPageAccessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 50, unique: true })
  host: string;
}
