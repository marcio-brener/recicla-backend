import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { TokenService } from 'src/token/token.service';
import { Usuario } from 'src/usuario/usuario.entity';
import { HorarioCadastrarDto } from './dto/horario.controlar.dto';
import { HorarioService } from './horario.service';



@Controller('horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService, 
    private readonly tokenService: TokenService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('cadastrar')
  async cadastrar(@Body() data: HorarioCadastrarDto, @Req() req): Promise<ResultadoDto>{    
    console.log(data);  // Verifique se o campo 'horarios' está no formato correto
    let token = req.headers.authorization
    let usuario: Usuario = await this.tokenService.getUsuarioByToken(token)
    if (usuario){
      return this.horarioService.cadastrar(data, usuario)    
    }else{
      throw new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

}