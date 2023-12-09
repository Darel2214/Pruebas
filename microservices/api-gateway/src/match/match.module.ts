import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';

import { MatchController } from './match.controller';

@Module({
  imports: [ProxyModule],
  controllers: [MatchController],
})
export class MatchModule {}
