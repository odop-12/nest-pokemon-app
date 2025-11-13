import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { config } from 'process';





@Injectable()
export class PokemonService {

  private defaultLimit: number; // le agregue el signo ? porque me daba error
  
  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService,
  ){

    //console.log(process.env.DEFAULT_LIMIT)
    //const defaultlimit = configService.get<number> ('defaultlimit') ;
    this.defaultLimit = configService.get<number> ('defaultlimit',10) ;
    //console.log( {defaultlimit} );
  }
  
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    
  try{
    const pokemon = await this.pokemonModel.create( createPokemonDto );
    return pokemon;  //'This action adds a new pokemon';

  } catch (error) {
     this.handleExceptions( error );
    //console.log(error) no dice mayor inforamcion del error
    /*if ( error.code === 11000 ) {
      throw new BadRequestException( `Pokemon Exists in DB ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check Server logs`);
    */
  }
  
  }

  findAll(paginationDto:PaginationDto) { // para regresar todos los pokemones
    //return `This action returns all pokemon`;
    
    const{ limit = this.defaultLimit/*limit=10*/, offset=0 } = paginationDto

    return this.pokemonModel.find()
     .limit( limit )
     .skip( offset )
     .sort({
      no: 1
     })
       .select('-__v');
  }

  async findOne(term: string) { // lo ponemos asincrono
    
    let pokemon : Pokemon |null = null; // agrego el " | null = null " para que no me de error
  
     if ( !isNaN(+term) ){
       //pokemon  = await this.pokemonModel.findOne( {no: term });
       pokemon = await this.pokemonModel.findOne( { no: term  } );
     }
 
     //mongodb
     if( !pokemon &&  isValidObjectId ( term)) {
      pokemon = await this.pokemonModel.findById( term );
     }
  
    // name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne( { name: term.toLowerCase().trim(), }  )
    }
/*if (JSON.stringify(Pokemon) === undefined) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }   */

     if ( !pokemon )
        throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found` );
    //return `This action returns a #${id} pokemon`;

    return pokemon;
  }

  async update( term: string , updatePokemonDto: UpdatePokemonDto) {

     const pokemon = await this.findOne( term );
     if ( updatePokemonDto.name )  
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      
      //await pokemon.updateOne ( updatePokemonDto, { new: true } );
    // const updatedPokemon = await pokemon.updateOne ( updatePokemonDto, { new: true } );
    try {
    await pokemon.updateOne( updatePokemonDto) ;
    return { ...pokemon.toJSON(), ...updatePokemonDto };    
    } catch (error) {
      this.handleExceptions( error );
    /*if ( error.code === 11000 ) {
      throw new BadRequestException( `Pokemon Exists in DB ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check Server logs`);      
    */
    }

  
      //return updatedPokemon ;//pokemon ;
   
    //return `This action updates a #${id} pokemon`;
  }

  async remove(id: string) {
    //const pokemon = await this.findOne( id );
    //await pokemon.deleteOne();
    //return `This action removes a #${id} pokemon`;
    //const result =await this.pokemonModel.findByIdAndDelete ( id );// asi funciona, pero una vez eliminado, y le volvemos a darle SEND,
    // el resultado siempre da OK, como que eliminara pero no valida que ya no existe.
    // const result = await this.pokemonModel.deleteMany ( { }) esto seria como poner delete * from pokemon CUIDADO
    //const result = await this.pokemonModel.deleteOne ( { _id: id }); asi esta super bien pero me da este mensaje
    /*
    {
    "acknowledged": true,
    "deletedCount": 0}
    */
    // vamos a modificar y validar el resultado.
    const { deletedCount } = await this.pokemonModel.deleteOne ( { _id: id });
     if ( deletedCount === 0 )
      throw new BadRequestException( `Pokemon with id "${ id }" not found` );

    return; //result;

  }

  // se crea esta excepcion y se sustituye en los lugares necesarios,
  // para la excepciones no controladas
   private handleExceptions ( error: any ){
  if ( error.code === 11000 ) {
      throw new BadRequestException( `Pokemon Exists in DB ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check Server logs`);      
    
   }
}
