import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  PaginationDto,
  USER_SERVICE_NAME,
  UpdateUserDto,
  UserServiceClient,
} from '@app/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';
@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  findAll() {
    return this.userService.findAllUsers({});
  }

  findOne(id: string) {
    return this.userService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userService.reomveUser({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationDto>();

    users$.next({ page: 0, limit: 10 });

    users$.next({ page: 1, limit: 10 });

    users$.next({ page: 2, limit: 10 });

    users$.next({ page: 3, limit: 10 });

    users$.next({ page: 4, limit: 10 });

    users$.complete();

    let chunkNumber = 1;

    this.userService.queryUsers(users$).subscribe((users) => {
      console.log('chunk', chunkNumber, users), (chunkNumber += 1);
    });
  }
}
