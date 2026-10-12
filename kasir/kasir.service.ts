import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class KasirService {
  checkout(member: string, metode: string, body: any) {
    
    const memberKecil = member.toLowerCase();
    if (
      memberKecil !== 'reguler' &&
      memberKecil !== 'silver' &&
      memberKecil !== 'gold'
    ) {
      throw new BadRequestException(
        'member harus reguler, silver, atau gold',
      );
    }

    
    if (!metode) {
      throw new BadRequestException('metode wajib diisi');
    }
    const metodeKecil = metode.toLowerCase();
    if (metodeKecil !== 'tunai' && metodeKecil !== 'qris') {
      throw new BadRequestException('metode harus tunai atau qris');
    }

    
    const items = body.items;
    if (!Array.isArray(items)) {
      throw new BadRequestException('items harus berupa array');
    }
    if (items.length === 0) {
      throw new BadRequestException('items tidak boleh kosong');
    }
    if (items.length > 10) {
      throw new BadRequestException('items maksimal 10 item');
    }

    
    const rincian: any[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const urutan = i + 1;

      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        throw new BadRequestException(
          `Item ke-${urutan}: nama harus string tidak kosong`,
        );
      }
      if (typeof item.harga !== 'number' || item.harga <= 0) {
        throw new BadRequestException(
          `Item ke-${urutan}: harga harus angka lebih dari 0`,
        );
      }
      if (!Number.isInteger(item.qty) || item.qty <= 0) {
        throw new BadRequestException(
          `Item ke-${urutan}: qty harus bilangan bulat lebih dari 0`,
        );
      }

      rincian.push({
        nama: item.nama,
        harga: item.harga,
        qty: item.qty,
        subtotal: item.harga * item.qty,
      });
    }

    
    let totalItem = 0;
    let subtotal = 0;
    for (const r of rincian) {
      totalItem += r.qty;
      subtotal += r.subtotal;
    }

    //  Diskon member
    let persenDiskon = 0;
    if (memberKecil === 'silver') persenDiskon = 5;
    if (memberKecil === 'gold') persenDiskon = 10;
    const diskon = (subtotal * persenDiskon) / 100;

    //  Biaya admin
    let biayaAdmin = 0;
    if (metodeKecil === 'qris') {
      biayaAdmin = ((subtotal - diskon) * 1) / 100;
    }

    //  Total bayar
    const total = subtotal - diskon + biayaAdmin;

    return {
      member: memberKecil,
      metode: metodeKecil,
      rincian,
      totalItem,
      subtotal,
      diskon,
      biayaAdmin,
      total,
    };
  }
}