import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ClientProxyFutbolito } from 'src/common/proxy/client-proxy';
import { MatchMsg } from 'src/common/constants';

@WebSocketGateway({ cors: true })
export class MensajesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly clientProxy: ClientProxyFutbolito) {}

  private _clientProxy = this.clientProxy.clientProxyMatches();

  @WebSocketServer() wss: Server;

  handleConnection(client: Socket) {
    console.log(`cliente conectado`, client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnect', client.id);
  }

  @SubscribeMessage('update-match')
  async updateMatch(client: Socket, payload: any) {
    const data = await this._clientProxy
      .send(MatchMsg.UPDATE, payload)
      .toPromise();

    this.wss.emit('match', data);
  }

  @SubscribeMessage('get-match')
  async getMatch(client: Socket, id: string) {
    const data = await this._clientProxy
      .send(MatchMsg.FIND_ONE, id)
      .toPromise();

    this.wss.emit('match', data);
  }
}
