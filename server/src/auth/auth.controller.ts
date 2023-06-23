import { Controller, Request, Post, UseGuards, Get, Body } from "@nestjs/common";
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from "./local-auth.guard";
import { RegisterDto } from "./dto/register.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
