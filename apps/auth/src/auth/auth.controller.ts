import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
  CreateUserDto,
  LoginRequest,
  UserServiceControllerMethods,
  ValidateRequest,
  ValidateResponse,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async login(loginRequest: LoginRequest) {
    const { email, password } = loginRequest;
    return await this.authService.login(email, password);
  }
  validate(
    request: ValidateRequest,
  ):
    | ValidateResponse
    | Promise<ValidateResponse>
    | Observable<ValidateResponse> {
    throw new Error('Method not implemented.');
  }

  register(createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
