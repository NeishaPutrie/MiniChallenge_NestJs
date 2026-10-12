import { BadRequestException, Injectable } from '@nestjs/common';
import { CekBilanganDto } from './dto/bilangan.dto.js';

@Injectable()
export class BilanganService {
    cekBilangan(input: string) {
    const angka = Number(input);
    
    if (!Number.isInteger(angka) || angka < 1 || angka > 100) {
        throw new BadRequestException('angka harus bilangan bulat 1 - 100');
    }

    let jenis = 'ganjil';
    if (angka % 2 === 0) {
        jenis = 'genap';
    }

    return {
        angka: angka,
        jenis: jenis,
        kuadrat: angka * angka,
        kelipatanLima: angka % 5 === 0,
    };
}
}
