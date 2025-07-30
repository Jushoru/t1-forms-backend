import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserGetDto } from './dto/userGet.dto';
import { IUserCreateResponse, IUsersData } from './users.interface';
import { v4 as uuid } from 'uuid';
import { findUserByEmail } from './utils';
import { UserPatchDto } from './dto/userPatch.dto';

export class UsersService {
  private usersDB: Record<string, IUsersData> = {
    '1': {
      name: 'Admin',
      id: '1',
      surName: 'Admin',
      fullName: 'Admin',
      password: 'admin',
      email: 'admin@inno.tech',
    },
  };

  getAll(): UserGetDto[] {
    return Object.values(this.usersDB).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, ...rest }: IUsersData) => ({ ...rest }),
    );
  }

  createUser({ email, name, ...rest }: UserCreateDto): IUserCreateResponse {
    const id = uuid();

    const checkIsEmailUnique = findUserByEmail(this.usersDB, email);

    if (checkIsEmailUnique)
      throw new HttpException('Already exist', HttpStatus.CONFLICT);

    this.usersDB[id] = { ...rest, email, name, id };

    return { name, id };
  }

  findById(id: string): UserGetDto | NotFoundException {
    const user = this.usersDB[id];

    if (!user) throw new NotFoundException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = user;
    return response;
  }

  updateUser(id: string, data: UserPatchDto): string | NotFoundException {
    const user = this.usersDB[id];

    if (!user) {
      if (!user) throw new NotFoundException();
    }

    const { password, email, id: userId } = user;
    this.usersDB[id] = { password, id: userId, email, ...data };

    return 'ok';
  }

  findOneByEmail(email: string): IUsersData | null {
    const user = findUserByEmail(this.usersDB, email);

    return user || null;
  }

  deleteUser(id: string): void {
    delete this.usersDB[id];
  }
}
