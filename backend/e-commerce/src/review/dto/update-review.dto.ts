import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    Rating:number
    @IsNotEmpty()
    @IsString()
    comment:string
}
