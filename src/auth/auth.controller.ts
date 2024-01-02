import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
  @Post('/local/register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }
  @Post('logout')
  logout(@Body() authDto: AuthDto) {
    return this.authService.logout(authDto);
  }
  @Post('refresh')
  refresh(@Body() authDto: AuthDto) {
    return this.authService.refresh(authDto);
  }
}
