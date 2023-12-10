import { Resolver, Query, Args } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}

  @Query(() => [Report], { name: 'todos' })
  findAll() {
    return this.reportsService.findAll();
  }

  @Query(() => [Report], { name: 'equipo' })
  findOne(@Args('equipo', { type: () => String }) equipo: string) {
    return this.reportsService.findByTeam(equipo);
  }
}
