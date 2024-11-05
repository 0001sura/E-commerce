import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from 'src/utitlity/auth-guard/auth-guard.guard';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';
import { Roles } from 'src/utitlity/roles/user-role.enum';
import { AuthorizeGuard } from 'src/utitlity/auth-guard/authorization.guard';


// @UseGuards(RolesGuard)
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard)
  @UseGuards()
  @Post()
  @ApiOperation({
    summary:'to create a user  '
   })
  create(@Body() createUserDto: CreateUserDto):Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get('profile')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @ApiOperation({
    summary:'to get a user in repository  '
   })
  findAll(@Req() req):Promise<UserEntity[]> {
    console.log(req)
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:'to get a user by id  '
   })
  async findOne(@Param('id') id: string): Promise<UserEntity>{
    return await this.userService.findOne(+id);
  }


  @Patch('profile')
  @ApiOperation({
    summary:'to update user information by id'
   })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto):Promise<UpdateResult> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:'to delete a user in repository'
   })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(+id);
  }
}
