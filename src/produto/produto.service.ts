import { Injectable, Inject } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuario/usuario.entity';
import { Produto } from './produto.entity';
import { ProdutoCadastrarDto } from './dto/produto.cadastrar.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @Inject('PRODUTO_REPOSITORY')
    private produtoRepository: Repository<Produto>,
  ) {}

  async cadastrar(data: ProdutoCadastrarDto, usuario: Usuario): Promise<ResultadoDto>{
    let produto = new Produto()
    produto.nome = data.nome
    produto.descricao = data.descricao
    produto.usuario = usuario
    return this.produtoRepository.save(produto).then(() => {
      return <ResultadoDto>{
        status: true,
        mensagem: "Produto cadastrado com sucesso!"
      }
    }).catch((error) => {
      console.error('Erro ao cadastrar usuário:', error);
      return <ResultadoDto>{
        status: false,
        mensagem: "Houve um erro ao cadastrar o produto!"
      }
    })
  }
}