import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  Request,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserRequestDto } from '@/user/dto/create-user-request.dto';
import { UserLoginRequestDto } from '@/user/dto/user-login-request.dto';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async findAll(@Request() req): Promise<any[]> {
    return await this.authService.findAll();
  }

  @Post('sign-up')
  async register(@Body() req: CreateUserRequestDto) {
    console.log('req', req);
    const result = await this.authService.register(req);
    console.log(result.username, result);
    return result;
  }

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async login(@Body() @Request() req: UserLoginRequestDto) {
    const result = await this.authService.login(req);
    return result;
  }
}
