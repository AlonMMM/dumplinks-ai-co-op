import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('google')
  googleLogin(@Body('credential') credential: string) {
    return this.authService.googleLogin(credential);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req: { user: { _id: { toString(): string } } }) {
    return this.authService.getMe(req.user._id.toString());
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(
    @Request() req: { user: { _id: { toString(): string } } },
    @Body() body: { name?: string; profilePictureUrl?: string },
  ) {
    return this.authService.updateMe(req.user._id.toString(), body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  deleteMe(@Request() req: { user: { _id: { toString(): string } } }) {
    return this.authService.deleteMe(req.user._id.toString());
  }
}
