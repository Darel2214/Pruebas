import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxyFutbolito } from 'src/common/proxy/client-proxy';
import { MatchMsg } from 'src/common/constants';

@Controller('api/v2/match')
export class MatchController {
  constructor(private readonly clientProxy: ClientProxyFutbolito) {}

  private _clientProxy = this.clientProxy.clientProxyMatches();

  @Post()
  create(@Body() matchDto: any): Observable<any> {
    return this._clientProxy.send(MatchMsg.CREATE, matchDto);
  }

  @Get()
  findAll(): Observable<any[]> {
    return this._clientProxy.send(MatchMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this._clientProxy.send(MatchMsg.FIND_ONE, id);
  }

  @Put()
  update(@Body() dto: any): Observable<any> {
    return this._clientProxy.send(MatchMsg.UPDATE, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this._clientProxy.send(MatchMsg.DELETE, id);
  }
}
