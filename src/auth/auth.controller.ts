import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { User } from 'src/user/entities/user.entity';
import { UserObj } from 'src/decorators/user-obj.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() req: AuthLoginDto,
      @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  async logout(
  @UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
  
}
