import {Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSignupDto } from '../auth/dto/create-signup-dto';
import * as bcrypt from 'bcrypt'
import { Roles } from 'src/utitlity/roles/user-role.enum';
@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity)
   private userRepository:Repository<UserEntity>
   
){}

 async create(createUserDto: CreateUserDto):Promise<UserEntity> {
   const user:UserEntity = await this.userRepository.create(createUserDto)
     await this.userRepository.insert(user)
     return user
     }

 async findAll():Promise<UserEntity[]> {
    return await this.userRepository.find({ select:['id','name','email','roles']})
  }

 async findOne(id: number):Promise<UserEntity> {
    const oneUser= await this.userRepository.findOne({where:{id:id}})
    if(!oneUser){throw new NotFoundException("user not found")}
    return oneUser
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<UpdateResult> {
    return await this.userRepository.update(id,updateUserDto)
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete({id}) }
 
    

}