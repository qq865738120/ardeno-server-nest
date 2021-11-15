import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const server = {
  port: 3001,
  host: '0.0.0.0',
};

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

const rsaKey = 'asdfadf2342sdf';

export default {
  test: 'development',
  server,
  database: typeOrmConfig,
  jwt,
  rsaKey,
};
