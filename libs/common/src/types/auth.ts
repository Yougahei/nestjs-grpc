/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  age: number;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  id: string;
  email: string;
  username: string;
  password: string;
  age: number;
  subscribed: boolean;
}

export interface Empty {
}

export interface PaginationDto {
  page: number;
  limit: number;
}

export interface UpdateUserDto {
  id: string;
  soicalMedia: SoicalMedia | undefined;
}

export interface FindOneUserDto {
  id: string;
}

export interface FindOneByEmailDto {
  email: string;
}

export interface Users {
  users: User[];
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  age: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  age: number;
  subscribed: boolean;
}

export interface SoicalMedia {
  twitterUri?: string | undefined;
  facebookUri?: string | undefined;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  findOneByEmail(request: FindOneByEmailDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  reomveUser(request: FindOneUserDto): Observable<Empty>;

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  findOneByEmail(request: FindOneByEmailDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  reomveUser(request: FindOneUserDto): Promise<Empty> | Observable<Empty> | Empty;

  queryUsers(request: Observable<PaginationDto>): Observable<Users>;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "findAllUsers",
      "findOneUser",
      "findOneByEmail",
      "updateUser",
      "reomveUser",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
