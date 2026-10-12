import { Controller, Get, Query } from '@nestjs/common';
import { SuhuService } from './suhu.service.js';

@Controller('suhu')
export class SuhuController {
  constructor(private readonly suhuService: SuhuService) {}

  @Get('konversi')
  konversi(@Query() query: KonversiSuhuDto) {
    return this.suhuService.konversi(query);
  }
}
