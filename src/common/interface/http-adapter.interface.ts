
export interface HttpAdapter{
    get<T>( url: string): Promise<T>; 
}

/*get<T>( url: string): Promise<T>
Entonces eso es algo que yo expliqué más en detalle en la introducción de TypeScript.
Por qué?
Porque aquí yo voy a poner queso de tipo genérico y voy a regresar algo de tipo T.
Si usted no saben qué es lo que acabo de hacer aquí, regresen a ese video introductorio donde explico
la parte de este patrón adaptador.
Es importante que lo miren porque así esto no estaría en chino, porque esto no tiene nada que ver con
esto.
Lo único que tiene Next es la inyección que les voy a enseñar muy pronto.
Ok, tenemos nuestra interfaz aquí ahora en la carpeta de adaptadores.
*/