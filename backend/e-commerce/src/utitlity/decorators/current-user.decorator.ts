// import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';
// import dataSource from 'db/data-source';
// import { UserEntity } from 'src/entities/user.entity';
// import { getRepository } from 'typeorm';

// export const CurrentUser = createParamDecorator(
//  async (data: never, ctx: ExecutionContext):Promise<UserEntity> => {
//     const request = ctx.switchToHttp().getRequest();
//     const userId = request.body.userId
//     const userRepository=dataSource.getRepository (UserEntity)
//     const user= await userRepository.findOne(userId)

// if(!user) throw new NotFoundException("user not found");
//   return user;
//   },
// );