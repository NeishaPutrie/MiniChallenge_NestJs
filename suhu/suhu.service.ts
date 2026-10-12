import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SuhuService {
  konversi(nilai?: string, dari?: string, ke?: string) {
    
    if (!nilai || !dari || !ke) {
      throw new BadRequestException('nilai, dari, dan ke wajib diisi');
    }

    
    const angka = Number(nilai);
    if (isNaN(angka)) {
      throw new BadRequestException('nilai harus berupa angka');
    }

    
    const satuan = ['celsius', 'fahrenheit', 'kelvin'];
    if (!satuan.includes(dari) || !satuan.includes(ke)) {
      throw new BadRequestException(
        'satuan harus celsius, fahrenheit, atau kelvin',
      );
    }

    
    if (dari === ke) {
      throw new BadRequestException('satuan asal dan tujuan tidak boleh sama');
    }

    if (dari === 'kelvin' && angka < 0) {
      throw new BadRequestException('kelvin tidak boleh kurang dari 0');
    }

    
    let celsius = angka;
    if (dari === 'fahrenheit') {
      celsius = ((angka - 32) * 5) / 9;
    } else if (dari === 'kelvin') {
      celsius = angka - 273.15;
    }

    
    let hasil = celsius;
    if (ke === 'fahrenheit') {
      hasil = (celsius * 9) / 5 + 32;
    } else if (ke === 'kelvin') {
      hasil = celsius + 273.15;
    }

   
    hasil = Math.round(hasil * 100) / 100;

    return {
      nilaiAsal: angka,
      satuanAsal: dari,
      hasil: hasil,
      satuanHasil: ke,
    };
  }
}