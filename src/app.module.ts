import { join } from 'path'; // este es propio de node por eso va al inicio 
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguation } from './config/env.config';
import { joiValidationSchema } from './config/joi.validation';



// la parte de ServeStaticModule.forRoot, me la traje del pdf
// se corrige los errores que muestre al pegar 
// join se corrige la primer linea join from path
@Module({
  imports: [ 

    ConfigModule.forRoot({
      load: [EnvConfiguation], // lo traemos del archivo env.config.ts
      validationSchema: joiValidationSchema,
    }),

    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
}), 

//MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), // quitamos y mandamos el parametro del archivo de variables
// de entorno env
MongooseModule.forRoot( process.env.MONGODB ?? '',{
  dbName: 'pokemonsdb',
}), // agregue el signo  ?? '' poraue si no me daba error
    // no lo deje como estaba en el curso que era asi// dbName: 'pokemonsdb' "pokemonsdb": Unknown word. //
PokemonModule,

CommonModule,

SeedModule,
  ],
})
export class AppModule {

  //constructor(){ console.log(process.env)} para que muestre todas las variables en terminal

}
