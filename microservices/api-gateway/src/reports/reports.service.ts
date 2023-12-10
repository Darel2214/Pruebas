import { Injectable } from '@nestjs/common';
import { MatchMsg } from 'src/common/constants';
import { ClientProxyFutbolito } from 'src/common/proxy/client-proxy';

@Injectable()
export class ReportsService {
  constructor(private readonly clientProxy: ClientProxyFutbolito) {}

  private _clientProxy = this.clientProxy.clientProxyMatches();

  async findAll() {
    const data = await this._clientProxy
      .send(MatchMsg.FIND_ALL, '')
      .toPromise();

    return data;
  }

  async findByTeam(name: string) {
    const data = await this._clientProxy
      .send(MatchMsg.FIND_ALL, '')
      .toPromise();

    const res = data.filter(
      (item) => item.equipo1 === name || item.equipo2 === name,
    );
    return res;
  }
}
