import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth-dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  login(authDto: AuthDto) {
    return authDto;
  }
  logout(authDto: AuthDto) {
    return authDto;
  }
  async register(authDto: AuthDto) {
    const hashPassword = await this.hashData(authDto.password);
    const newUser = new CreateUserDto();
    newUser.email = authDto.email;
    newUser.hashPassword = hashPassword;
    newUser.accessToken = '';
    const user = await this.userService.create(newUser);
    return user;
  }
  refresh(authDto: AuthDto) {
    return authDto;
  }
  async validateUser(authDto: AuthDto): Promise<Omit<User, 'hashPassword'>> {
    const user = await this.userService.findOneByEmail(authDto.email);
    if (user && (await this.compareData(authDto.password, user.hashPassword))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashPassword, ...result } = user;
      return result;
    }
    return null;
  }
  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  private compareData(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }
}
