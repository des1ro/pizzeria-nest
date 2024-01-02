import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  save(user: User) {
    return this.repository.save(user);
  }
  findAll() {
    return this.repository.find();
  }
  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }
  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }
  remove(user: User) {
    return this.repository.remove(user);
  }
}
