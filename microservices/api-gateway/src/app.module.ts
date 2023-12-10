import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { MensajesModule } from './mensajes/mensajes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MatchModule,
    MensajesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
