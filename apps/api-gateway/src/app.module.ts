import { Module } from '@nestjs/common';
import config from '@app/common/configs/config';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
