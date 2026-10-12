import { BadRequestException, Injectable } from '@nestjs/common';
import { DeretParamsDto, DeretQueryDto } from './dto/generate-deret.dto';

@Injectable()
export class DeretService {
  generate(params: DeretParamsDto, query: DeretQueryDto) {
    const jenis = params.jenis;
    const jumlahInput = query.jumlah;
    let urutan = query.urutan;

    
    if (!['ganjil', 'genap', 'kuadrat'].includes(jenis)) {
      throw new BadRequestException('jenis harus ganjil, genap, atau kuadrat');
    }

    
    if (!jumlahInput) {
      throw new BadRequestException('jumlah wajib diisi');
    }

    
    const jumlah = Number(jumlahInput);
    if (!Number.isInteger(jumlah) || jumlah < 1 || jumlah > 20) {
      throw new BadRequestException('jumlah harus bilangan bulat 1 sampai 20');
    }


    if (urutan === undefined) {
      urutan = 'asc';
    }
    if (urutan !== 'asc' && urutan !== 'desc') {
      throw new BadRequestException('urutan harus asc atau desc');
    }

    
    const data: number[] = [];
    let total = 0;

    for (let i = 1; i <= jumlah; i++) {
      let nilai = 0;

      if (jenis === 'ganjil') {
        nilai = 2 * i - 1;
      } else if (jenis === 'genap') {
        nilai = 2 * i;
      } else {
        nilai = i * i;
      }

      data.push(nilai);
      total += nilai;
    }

    
    if (urutan === 'desc') {
      data.reverse();
    }

    return {
      jenis: jenis,
      jumlah: jumlah,
      data: data,
      total: total,
    };
  }
}