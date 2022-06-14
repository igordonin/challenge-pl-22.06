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
  Session,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize-interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user-dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/current-user')
  currentUser(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto, @Session() session: any) {
    const { email, password } = userDto;
    const user = await this.authService.signup(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() userDto: CreateUserDto, @Session() session: any) {
    const { email, password } = userDto;
    const user = await this.authService.authenticateUser(email, password);
    session.userId = user.id;
    return user;
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
