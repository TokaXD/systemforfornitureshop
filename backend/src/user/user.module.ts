import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users_entity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users_entity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
