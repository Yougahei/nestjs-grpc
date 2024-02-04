import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  CreateUserDto,
  SecurityConfig,
  Token,
  ValidateResponse,
} from '@app/common';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private authSvc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.authSvc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.authSvc.validate({ token }));
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    try {
      const user = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      throw new ConflictException(`Email ${createUserDto.email} already used.`);
    }
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );
    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userId: user.id,
    });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }
}
