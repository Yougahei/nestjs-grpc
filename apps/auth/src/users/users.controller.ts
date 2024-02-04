import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserServiceController,
  CreateUserDto,
  UpdateUserDto,
  UserServiceControllerMethods,
  FindOneUserDto,
  PaginationDto,
  FindOneByEmailDto,
  User,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  findOneByEmail(
    request: FindOneByEmailDto,
  ): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  reomveUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
