import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize-interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user-dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signup(@Body() userDto: CreateUserDto) {
    const { email, password } = userDto;
    return this.authService.signup(email, password);
  }

  @Post('/signin')
  signin(@Body() userDto: CreateUserDto) {
    const { email, password } = userDto;
    return this.authService.authenticateUser(email, password);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.usersService.update(parseInt(id), userDto);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOneById(parseInt(id));

    if (!user) {
      throw new NotFoundException(`User identified by ${id} not found`);
    }

    return user;
  }

  @Get()
  findUsers(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
