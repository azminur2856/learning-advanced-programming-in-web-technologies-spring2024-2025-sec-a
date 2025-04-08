import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './Tables/photo.entity';
import { Users } from './Tables/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
