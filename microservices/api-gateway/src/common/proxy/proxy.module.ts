import { Module } from '@nestjs/common';
import { ClientProxyFutbolito } from './client-proxy';

@Module({
  providers: [ClientProxyFutbolito],
  exports: [ClientProxyFutbolito],
})
export class ProxyModule {}
