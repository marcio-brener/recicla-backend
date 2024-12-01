import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './produto/produto.module';
import { HorarioModule } from './horario/horario.modle';

@Module({
  imports: [
    AuthModule,
    ProdutoModule,
    HorarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
