import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repo';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    if (!this.findOneByEmail(user.email)) {
      throw new ForbiddenException(
        `User with email: ${user.email} already exist`,
      );
    }
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.findAll();
  }
  findOneById(id: string) {
    return this.repository.findOne(id);
  }
  findOneByEmail(email: string) {
    return this.repository.findOneByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
