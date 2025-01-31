import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  driver: require('@libsql/sqlite3'),
  database: 'libsql://voley-mruse77.turso.io',
  extra: {
    authToken:
      'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3Mzc4NDkxOTQsImlhdCI6MTczNzc2Mjc5NCwiaWQiOiI2ZGI1MmU0Ny04MDAwLTRjNWUtOTUzZC0yYzZmYjdlMWE4OTkifQ.yvu9jNYihbWpULKnhwgd04SiMW249IO_2JrEa5W2-g418OHgIT8jFj6klXPPE4LT9IbbZdk_yLhdfw7eBfQRDg',
    foreign_keys: 'ON',
  },
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: true,
};
