import { Connection, Repository } from 'typeorm';
import { Produto } from './produto.entity';

export const produtoProviders = [
  {
    provide: 'PRODUTO_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Produto),
    inject: ['DATABASE_CONNECTION'],
  },
];