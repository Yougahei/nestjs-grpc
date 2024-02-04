import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  Users,
} from '@app/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  createUser(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return {
      users: this.users,
    };
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  findOneByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
    }
    throw new NotFoundException(`User with id ${id} not found.`);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException(`User with id ${id} not found.`);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.limit;
      subject.next({
        users: this.users.slice(start, start + paginationDto.limit),
      });
    };
    const onComplete = () => subject.complete();
    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });
    return subject.asObservable();
  }
}
