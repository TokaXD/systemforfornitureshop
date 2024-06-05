import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, DatabaseModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Substitua pelo seu segredo
      signOptions: { expiresIn: '60m' },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
