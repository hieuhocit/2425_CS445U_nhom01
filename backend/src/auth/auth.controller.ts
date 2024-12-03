import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/decorator';
import { AuthPayloadDto, AuthPermission } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signIn')
  async signIn(
    @Body() credentials: AuthPayloadDto,
  ): Promise<AuthPermission | boolean> {
    const isAuth = await this.authService.signIn(credentials);
    return isAuth;
  }

  @Public()
  @Post('/signUp')
  async signUp(
    @Body() authPayload: AuthPayloadDto,
  ): Promise<AuthPermission | boolean> {
    const result = await this.authService.signUp(authPayload);
    // console.log(111, result);
    if (!result) {
      throw new BadRequestException('Invalid username or password');
    }
    return result;
  }
}
