import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { IUserCreateResponse } from './users.interface';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserGetDto } from './dto/userGet.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserPatchDto } from './dto/userPatch.dto';

@ApiBasicAuth()
@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', isArray: true })
  @Get()
  getAll(): UserGetDto[] {
    return this.usersService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  getUser(@Param('id') id: string): UserGetDto | NotFoundException {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Param('id') id: string, @Body() data: UserPatchDto) {
    return this.usersService.updateUser(id, data);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'Success',
  })
  createUser(@Body() data: UserCreateDto): IUserCreateResponse {
    return this.usersService.createUser(data);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  deleteUser(@Param('id') id: string): string {
    this.usersService.deleteUser(id);
    return 'Ok';
  }
}
