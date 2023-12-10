import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthMsg } from 'src/common/constants';
import { ClientProxyFutbolito } from 'src/common/proxy/client-proxy';

@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly clientProxy: ClientProxyFutbolito) {}

  private _clientProxy = this.clientProxy.clientProxyAuth();

  @Post('register')
  register(@Body() dto: any): Observable<any> {
    return this._clientProxy.send(AuthMsg.REGISTER, dto);
  }

  @Post('login')
  login(@Body() dto: any): Observable<any> {
    return this._clientProxy.send(AuthMsg.LOGIN, dto);
  }
}
