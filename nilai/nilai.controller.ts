import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { NilaiService } from './nilai.service.js';
import { HitungNilaiDto } from './dto/nilai.dto.js';

@Controller('nilai')
export class NilaiController {
  constructor(private nilaiService: NilaiService) {}

  @Post('hitung')
  @HttpCode(200)
  hitung(@Body() body: HitungNilaiDto) {
    return  this.nilaiService.hitung(body);
  }
}

// SOAL NOMOR 4