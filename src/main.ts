import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'pg';

async function bootstrap() {
  // Connect to the default 'postgres' system database first
  const client = new Client({
    host: '127.0.0.1',
    port: 5433,
    user: 'postgres',
    password: 'password',
  });
  await client.connect();

  // Check if your application database exists
  const res = await client.query(
    "SELECT 1 FROM pg_database WHERE datname='test'",
  );

  if (res.rowCount === 0) {
    await client.query('CREATE DATABASE test');
  }
  await client.end();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
