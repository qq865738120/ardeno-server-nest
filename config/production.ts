import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const server = {
  port: 3000,
  host: '0.0.0.0',
};

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'nas.ddnszwj.top',
  port: 54321,
  username: 'postgres',
  password: 'Postgres675919',
  database: 'ardeno-server-prod-db',
  entities: [`${__dirname}/../src/**/*.entity.{js,ts}`],
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
};

const jwt = {
  secret: 'AJlksjdfHDKlkjsdfJHFKHsdfE23KlksjdfHF32KEU23sdfYIka234RYIRJ',
  expiration: '604800s',
};

export default {
  test: 'product',
  server,
  database: typeOrmConfig,
  jwt,
};
