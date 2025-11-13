import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
//import { HttpAdapter } from '../../dist/common/interface/http-adapter.interface';
import { AxioAdapter } from 'src/common/adapters/axios.adapter';




@Injectable()
export class SeedService {
  //private readonly axios: AxiosInstance = axios; lo quitamos y lo pasamos a axios.adapter

  constructor(
    @InjectModel(Pokemon.name)
       private readonly pokemonModel: Model<Pokemon>,

       private readonly http: AxioAdapter,
    )
  {}
async executeSeed(){
//console.log('?? Ejecutando código actualizado de executeSeed');
    await this.pokemonModel.deleteMany({}); // esto es igual a delete * from pokemos;

// podemos utilizar varias formas realizar la peticione http, pero vamos a utilizar
// axiox, con el fetch se puede y aqui esta el ejemplo
//  console.log(  fetch ); // se puede utilizar con version 18 o superior de node ( en terminal node -v)
   const  data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600')

   const pokemonToInsert: {name: string, no: number}[]= [];

   data.results.forEach(({ name, url }) => {
    const segments = url.split('/'); // con esto en la terminal aparace asi ( [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ] )
    const no = +segments [ segments.length -2 ];

   pokemonToInsert.push({name, no } ); // tenemos un arreglo que dice { name: bulbasor, no: 1}


/*   dejo este codigo, y asi me funcion, y dejo por referencia
   //const insertPromisesArray = []; // asi no me funciono y por eso agregue lo de abajo
   const insertPromisesArray: Promise<any>[] = [];

  //data.results.forEach(async({ name, url }) => {  le voy a quitar el async porque no lo necesito
  data.results.forEach(({ name, url }) => {
    const segments = url.split('/'); // con esto en la terminal aparace asi ( [ 'https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '' ] )
    //console.log(segments)
    const no = +segments [ segments.length -2 ];
    
   // const pokemon = await this.pokemonModel.create({name, no } ); para no utilizar await comentamos

   insertPromisesArray.push(
    this.pokemonModel.create({name, no } )
    */

   // console.log({ name, no })
  });

     //await Promise.all(insertPromisesArray);
     await this.pokemonModel.insertMany(pokemonToInsert);
     // si lo vemos desde una base de datos SQL seria de esta forma
     // insert into pokemon( name, no)
     // (name:bulbasur, no: 1).... 

    //return 'Seed Executed';//data.results;
    return 'Seed Execute !!!';

  } 
}

/* con este encontre que en la linea " await Promise.all(insertPromisesArray);" me daba error 
  // en la Promise, y la quite del mongoose
 async executeSeed() {
  try {
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');
    const insertPromisesArray: Promise<any>[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    });
    try {
  await Promise.all(insertPromisesArray);
} catch (error) {
  console.error('Error en Promise.all:', error);
  throw error;
}
    return 'Seed Execute !!!';
  } catch (error) {
    console.error('Error en executeSeed:', error);
    throw error;
  }
}
}
*/