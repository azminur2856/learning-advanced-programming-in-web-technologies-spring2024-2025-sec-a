import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

export default (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.dbHost,
  port: Number(process.env.dbPort),
  username: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.dbName,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});
