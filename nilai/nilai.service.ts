import { BadRequestException, Injectable } from '@nestjs/common';
import { HitungNilaiDto } from './dto/nilai.dto.js';

@Injectable()
export class NilaiService {
  hitung(body: HitungNilaiDto) {
    const { nama, tugas, uts, uas } = body;

    if (typeof nama !== 'string' || nama.trim() === '') {
      throw new BadRequestException('Nama tidak boleh kosong!');
    }

    if (!Array.isArray(tugas) || tugas.length < 1) {
      throw new BadRequestException('tugas miinimal berisi 1 angka');
    }

    for (const n of tugas) {
      if (typeof n !== 'number' || n < 0 || n > 100) {
        throw new BadRequestException('nilai tugas harus angka 0 sampai 100');
      }
    }

     if (typeof uts !== 'number' || uts < 0 || uts > 100)  {
      throw new BadRequestException('uts harus angka 0 sampai 100');
    }

    if (typeof uas !== 'number' || uas < 0 || uas > 100) {
      throw new BadRequestException('uas harus angka 0 sampai 100');
    }

    const total = tugas.reduce((total, n) => total + n, 0);
    const rataTugas = total / tugas.length;

    const nilaiAkhir = 0.3 * rataTugas + 0.3 * uts + 0.4 * uas;
    const nilaiAkhirBulat = Math.round(nilaiAkhir * 100) / 100;

     let predikat = 'D';
    if (nilaiAkhirBulat >= 90) {
      predikat = 'A';
    } else if (nilaiAkhirBulat >= 80) {
      predikat = 'B';
    } else if (nilaiAkhirBulat >= 70) {
      predikat = 'C';
    }

    
    let status = 'Remedial';
    if (nilaiAkhirBulat >= 75) {
      status = 'Lulus';
    }

    return {
      nama: nama.trim(),
      rataTugas: rataTugas,
      nilaiAkhir: nilaiAkhirBulat,
      predikat: predikat,
      status: status,
    };
  }
}
