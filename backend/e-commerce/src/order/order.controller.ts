import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Post('place')
  @ApiOperation({
    summary:'to create an order  '
   })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(+id);
  }

  @Put(':id')
 async update(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return await this.orderService.update(+id, updateOrderStatusDto);
  }
  
  @Put('cancel/:id')
  async cancel(@Param('id') id: string) {
    return this.orderService.cancel(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(+id);
  }
}
