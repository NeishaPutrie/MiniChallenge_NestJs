import { Controller, Get, Param } from '@nestjs/common';
import { BilanganService } from './bilangan.service.js';
import { CekBilanganDto } from './dto/bilangan.dto.js';

@Controller('bilangan')
export class BilanganController {
  constructor(private readonly bilanganService: BilanganService) {}

  @Get(':angka')
  cekBilangan(@Param('angka') angka: string) {
    return this.bilanganService.cekBilangan(angka);
  }
}
