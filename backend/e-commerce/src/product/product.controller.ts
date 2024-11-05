import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
import { AuthGuard } from 'src/utitlity/auth-guard/auth-guard.guard';
import { AuthenticationGuard } from 'src/utitlity/auth-guard/authentication.guard';
import { AuthorizeGuard } from 'src/utitlity/auth-guard/authorization.guard';
import { Roles } from 'src/utitlity/roles/user-role.enum';
import { CurrentUser } from 'src/utitlity/current-user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
// @UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto,
      @CurrentUser() currentUser:UserEntity
)
{
    return await this.productService.create(createProductDto, currentUser);
  }

  @Get('list')
 async findAll(){
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(+id);
  }

   @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete('delete')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(+id);
  }
}
