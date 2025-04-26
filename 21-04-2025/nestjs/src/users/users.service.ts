import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      return 'User already exists with this email';
    }
    const existingUserPhone = await this.userRepo.findOne({
      where: { phone: createUserDto.phone },
    });
    if (existingUserPhone) {
      return 'User already exists with this phone number';
    }
    const user = await this.userRepo.create(createUserDto);
    const savedUser = await this.userRepo.save(user);
    if (!savedUser) {
      return 'User not created';
    }
    return {
      message: 'User created successfully',
      user: savedUser,
    };
  }

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }

  async getAllUsers() {
    const users = await this.userRepo.find();
    if (!users) {
      return 'No users found';
    }
    return {
      message: 'Users retrieved successfully',
      users,
    };
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      return 'User not found';
    }
    return {
      message: 'User retrieved successfully',
      user,
    };
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async getProfile(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      return 'User not found';
    }
    return {
      message: 'User profile retrieved successfully',
      user,
    };
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      return 'User not found';
    }

    // Hash password if it's being updated
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    await this.userRepo.update(id, updateUserDto);

    const updatedUser = { ...user, ...updateUserDto };

    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      return 'User not found';
    }
    await this.userRepo.delete(id);
    return {
      message: 'User deleted successfully',
      user,
    };
  }
}
