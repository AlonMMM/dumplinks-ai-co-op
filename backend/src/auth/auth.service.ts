import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private issueToken(user: UserDocument) {
    return this.jwtService.sign({ sub: user._id.toString(), email: user.email });
  }

  private toProfile(user: UserDocument) {
    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      profilePictureUrl: user.profilePictureUrl,
    };
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      email: dto.email,
      passwordHash,
      name: dto.name ?? dto.email.split('@')[0],
    });

    return { token: this.issueToken(user), user: this.toProfile(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user?.passwordHash) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return { token: this.issueToken(user), user: this.toProfile(user) };
  }

  async googleLogin(accessToken: string) {
    let payload: { sub?: string; id?: string; email?: string; name?: string; picture?: string };
    try {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
      );
      if (!res.ok) throw new Error('Failed to fetch user info');
      payload = await res.json();
    } catch {
      throw new BadRequestException('Invalid Google access token');
    }

    if (!payload.email) throw new BadRequestException('Google account has no email');

    let user = await this.usersService.findByEmail(payload.email);
    const googleId = payload.id ?? payload.sub;
    if (!user) {
      user = await this.usersService.create({
        email: payload.email,
        googleId,
        name: payload.name,
        profilePictureUrl: payload.picture,
      });
    } else if (!user.googleId) {
      await this.usersService.update(user._id.toString(), { googleId });
    }

    return { token: this.issueToken(user), user: this.toProfile(user) };
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException();
    return this.toProfile(user);
  }

  async updateMe(userId: string, data: { name?: string; profilePictureUrl?: string }) {
    const user = await this.usersService.update(userId, data);
    if (!user) throw new UnauthorizedException();
    return this.toProfile(user);
  }

  async deleteMe(userId: string) {
    await this.usersService.delete(userId);
  }
}
