import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalPageAccessEntity } from './personal-page-access.entity';
import { PersonalPageController } from './personal-page.controller';
import { PersonalPageService } from './personal-page.service';

const TYPEORM_MODULE = TypeOrmModule.forFeature([PersonalPageAccessEntity]);

@Module({
  imports: [TYPEORM_MODULE, PersonalPageAccessEntity],
  controllers: [PersonalPageController],
  providers: [PersonalPageService],
})
export class PersonalPageModule {}
