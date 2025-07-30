import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'password', nullable: false })
  password: string;

  @IsEmail()
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;
}
