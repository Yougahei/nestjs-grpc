import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { HttpExceptionFilter } from '@app/common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../auth.proto'),
        package: AUTH_PACKAGE_NAME,
      },
    },
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.listen();
}
bootstrap();
