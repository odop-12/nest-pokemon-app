import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interface/http-adapter.interface";

@Injectable() // El AxioAdapter , me da error y le doy Ctrl + punto y aplico
export class AxioAdapter implements HttpAdapter {

    private  axios: AxiosInstance = axios; // lo traemos del seed.services.ts

    async get<T>(url: string): Promise<T> {
        //throw new Error("Method not implemented.");
        try {
             const { data } = await this.axios.get<T>( url );
             return data;
        } catch (error){
          throw new Error( 'This is an error Desarrollo-check logs')
        }
    }

}

/*
Voy a crearme.

Hay varias maneras.

Podríamos usar el sí o podríamos escribirlo manualmente, pero esta vez creo que lo voy a hacer manualmente

solo para que tenga más sentido.

Voy a crearme un archivo que se llame Acciones Punto Adapter, Punto TS y voy a presionar Enter Export

class Accesos Adapter abre solo llaves.

La idea de este adapter es que sea un envoltorio de mi código con mi código, el cual va a ayudarme

a que si Access cambia por alguna razón, sólo tenga que cambiar esta clase y este Adapter debe de implementar

la clase o la interfaz, mejor dicho de nuestro http adapter, que fue lo que hicimos en unos instantes

que debe de implementar esto?

Se está quejando aquí Adapter, esto es algo que ya habíamos visto.

Voy a presionar control punto y voy a implementar la interfaz http adapter y aquí ya rápidamente me

crea el código necesario para que cumpla y satisfaga esta interfaz.
*/