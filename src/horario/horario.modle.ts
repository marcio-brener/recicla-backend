import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import { DatabaseModule } from '../database/database.module';
import { HorarioService } from './horario.service';
import { horarioProviders } from './horario.providers';
import { HorarioController } from './horario controller';



@Module({
  imports: [DatabaseModule, TokenModule],
  controllers: [HorarioController],
  providers: [
    ...horarioProviders,
    HorarioService,
  ],
  exports: [HorarioService]
})
export class HorarioModule {}