import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    constructor(private uploadService:UploadService){}

 @Post('upload')
 @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file:Express.Multer.File ){}
}
