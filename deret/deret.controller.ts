import { Controller, Get, Param, Query } from '@nestjs/common';
import { DeretService } from './deret.service.js';
import { DeretParamsDto, DeretQueryDto } from './dto/deret.dto.js';

@Controller('deret')
export class DeretController {
  constructor(private readonly deretService: DeretService) {}

  @Get(':jenis')
  generate(@Param() params: DeretParamsDto, @Query() query: DeretQueryDto){
    return this.deretService.generate(params, query);
  }
}
