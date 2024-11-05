import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import {IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCategoryDto{
@IsString()
title:string

@ValidateNested()
@Type(()=>CreateCategoryDto)
updateCategoryDto:CreateCategoryDto

}
