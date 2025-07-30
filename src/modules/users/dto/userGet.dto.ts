import { ApiProperty } from '@nestjs/swagger';
import { UserCreateDto } from './userCreate.dto';
import {
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsOptional,
  IsDate,
  IsPhoneNumber,
  IsString,
  IsBoolean,
} from 'class-validator';

export class UserGetDto {
  @ApiProperty({ description: 'User id' })
  id: string;

  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ description: 'User name', nullable: false })
  name: string;

  @IsNotEmpty()
  @MaxLength(64)
  @ApiProperty({ description: 'User surname', nullable: false })
  surName: string;

  @IsNotEmpty()
  @MaxLength(130)
  @ApiProperty({ description: 'User full name', nullable: false })
  fullName: string;

  @IsEmail()
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ description: 'User birthday', nullable: true })
  birthDate?: Date;

  @IsOptional()
  @IsPhoneNumber('RU')
  @ApiProperty({ description: 'User phone', nullable: true })
  telephone?: string;

  @IsString()
  @ApiProperty({ description: 'User employment', nullable: true })
  employment?: string;

  @IsBoolean()
  @ApiProperty({ description: 'User agreement', nullable: true })
  userAgreement?: boolean;
}
