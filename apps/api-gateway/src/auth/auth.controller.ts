import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from '@app/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterRequest) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginRequest) {
    return this.authService.login(data);
  }
}
