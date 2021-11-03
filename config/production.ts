import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
  test: '123',
  database: typeOrmConfig,
  jwt,
};
