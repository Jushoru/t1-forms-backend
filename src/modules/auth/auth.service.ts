import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUsersData } from '../users/users.interface';
import { JwtService } from '@nestjs/jwt';
import { UserGetDto } from '../users/dto/userGet.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const user = this.usersService.findOneByEmail(email);

    if (user?.password !== password) {
      return null;
    }

    const { id, email: userEmail } = user;

    const payload = { sub: id, email: userEmail };

    return {
      access_token: await this.jwtService?.signAsync(payload, {
        expiresIn: '100d',
      }),
    };
  }
}
