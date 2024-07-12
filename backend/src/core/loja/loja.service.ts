import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { Loja } from './entities/loja.entity';

@Injectable()
export class LojaService {
  @InjectRepository(Loja)
  private repository: Repository<Loja>;

  async create(createLojaDto: CreateLojaDto): Promise<Loja> {
    const loja = new Loja(createLojaDto);

    const novaLoja = this.repository.create(loja);

    return await this.repository.save(novaLoja);
  }

  findAll() {
    return `This action returns all loja`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loja`;
  }

  update(id: number, updateLojaDto: UpdateLojaDto) {
    return `This action updates a #${id} loja`;
  }

  remove(id: number) {
    return `This action removes a #${id} loja`;
  }
}
