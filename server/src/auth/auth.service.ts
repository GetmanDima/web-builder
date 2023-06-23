import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { _id, email, type } = user;
      return { email, type, id: _id };
    }

    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email, type: user.type };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(dto.password, salt);
    const user =  await this.userService.createUser({
      ...dto,
      password: passwordHash,
      type: 'user',
    });
    const userData = user.toJSON();
    
    return Object.keys(userData).reduce((res, fieldName) => {
      if (fieldName !== 'password') {
        res[fieldName] = userData[fieldName];
      }

      return res;
    }, {});
  }
}
