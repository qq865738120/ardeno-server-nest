import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalPageAccessEntity } from './personal-page-access.entity';

@Injectable()
export class PersonalPageService {
  constructor(
    @InjectRepository(PersonalPageAccessEntity)
    private readonly personalPageRepository: Repository<PersonalPageAccessEntity>,
  ) {}

  async access(host: string) {
    // Logger.debug(config.get('test'), 'adf');
    const access = await this.personalPageRepository.findOne({
      where: { host },
    });
    if (!access) {
      const newAccess = this.personalPageRepository.create({
        host,
      });
      await this.personalPageRepository.save(newAccess);
    }
    const result = await this.personalPageRepository
      .createQueryBuilder('access-count')
      .select('COUNT(*) count')
      .getRawOne();
    return result.count;
  }
}
