import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { LedgerEntity } from './ledger.entity';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { TasksService } from './tasks.service';

const TYPEORM_MODULE = TypeOrmModule.forFeature([LedgerEntity]);

@Module({
  imports: [TYPEORM_MODULE, LedgerEntity, HttpModule],
  controllers: [LedgerController],
  providers: [LedgerService, TasksService],
})
export class LedgerModule {}
