import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './Tables/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async saveUser(data) {
    const result = await this.userRepo.save(data);
    if (result) {
      return {
        message: 'User saved successfully!',
        user: result,
      };
    } else {
      return {
        message: 'Failed to save user.',
      };
    }
  }
  async getAllUser() {
    const result = await this.userRepo.find();
    if (result) {
      return {
        message: 'Users retrieved successfully!',
        users: result,
      };
    } else {
      return {
        message: 'Failed to retrieve users.',
      };
    }
  }
  async getUserById(id: number) {
    const result = await this.userRepo.findOne({ where: { id } });
    if (result) {
      return {
        message: 'User retrieved successfully!',
        user: result,
      };
    } else {
      return {
        message: 'Failed to retrieve user.',
      };
    }
  }

  async deleteUser(id: number) {
    const result = await this.userRepo.delete(id);
    if ((result.affected ?? 0) > 0) {
      return {
        message: 'User deleted successfully!',
      };
    } else {
      return {
        message: 'Failed to delete user.',
      };
    }
  }
}
