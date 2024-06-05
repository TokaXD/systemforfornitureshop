import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users_entity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users_entity]),
            PassportModule,
            JwtModule.register({
              secret: 'secretKey',
              signOptions: { expiresIn: '60m'}
            })
          ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
