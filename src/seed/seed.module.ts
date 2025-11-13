import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from '../pokemon/pokemon.module';
//import { PokemonModule } from './../pokemon/pokemon.module';



@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
   PokemonModule,
   CommonModule
  ]
})
export class SeedModule {}
