import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './reports.resolver';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  providers: [ReportsResolver, ReportsService],
})
export class ReportsModule {}
