<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo


1. Clonar el repositorio
2. ejecutar
```
yarn install
```
3. tener nest cli instalado
```
npm i -g @nestjs/cli
```

4. levantar la base de datos para ver en docker
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```

6. LLenar las variables de entorno definidas en el ``` .env ```

7. Ejecutar la aplicacion en dev:
```
yarn start:dev ( en la terminal)

8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```
8.1 Levantar docker
```
docker-compose up -d

## Stack usado (Recomendado agregrelo)
* MongoDB
* Nest