import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Upload } from 'src/entities/upload.entity';

@Module({
  // imports:[TypeOrmModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
