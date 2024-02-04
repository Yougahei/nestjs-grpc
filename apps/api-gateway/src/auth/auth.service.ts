import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  LoginRequest,
  RegisterRequest,
  ValidateRequest,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from '../users/constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  register(request: RegisterRequest) {
    return this.authService.register(request);
  }

  login(login: LoginRequest) {
    return this.authService.login(login);
  }

  validate(request: ValidateRequest) {
    return this.authService.validate(request);
  }
}
