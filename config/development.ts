import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'nas.ddnszwj.top',
  port: 54321,
  username: 'postgres',
  password: 'Postgres675919',
  database: 'ardeno-server-test-db',
  entities: [`${__dirname}/../src/**/*.entity.{js,ts}`],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
};

const jwt = {
  secret: 'AJHDKJHFKHEKHFKEUYIRYIRJ',
  expiration: '604800s',
};

export default {
  test: 'develop',
  database: typeOrmConfig,
  jwt,
};
