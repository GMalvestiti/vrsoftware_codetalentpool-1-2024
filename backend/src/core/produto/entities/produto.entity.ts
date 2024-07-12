import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoLoja } from './produto-loja.entity';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_produto',
    type: 'int',
  })
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  descricao: string;

  @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true })
  custo: number;

  @Column({ type: 'bytea', nullable: true })
  imagem: string;

  @OneToMany(() => ProdutoLoja, (produtoloja) => produtoloja.produto, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: ['insert', 'remove'],
    orphanedRowAction: 'delete',
  })
  produtoloja: ProdutoLoja[];
}