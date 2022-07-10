# apiRest-PG

## Crear un usuario

### Request

`POST /user/`

    https://api-rest-adoptame.herokuapp.com/api/v1.0/user

### Response

    HTTP/1.1 201 Created

    {"message": "User Created Successfully!, If you solicited a verification of fundation the state is pending"}

## Obtener los usuarios

### Request

`GET /user/users`

    bearer: token

    https://api-rest-adoptame.herokuapp.com/api/v1.0/user/users

### Response

    HTTP/1.1 200

    [
      {
      "id": id,
      "name": "nombre",
      "lastName": "lastName",
      "email": "email",
      "role": "role",
      "active": true,
      "donaciones": 0,
      "address": "address",
      "phone": "",
      "document": null,
      "countryId": "CHL",
      "cityId": 580
      }
    ]

## Obtener los usuarios por id

### Request

`GET /user/users/{id}`

    bearer: token

    https://api-rest-adoptame.herokuapp.com/api/v1.0/user/{id}

### Response

    HTTP/1.1 200

    {
      "id": id,
      "name": "nombre",
      "lastName": "lastName",
      "email": "email",
      "role": "role",
      "active": true,
      "donaciones": 0,
      "address": "address",
      "phone": "",
      "document": null,
      "countryId": "CHL",
      "cityId": 580
    }
    
## Obtener los usuarios por id

### Request

`PUT /user/{id}/`

    bearer: token

    https://api-rest-adoptame.herokuapp.com/api/v1.0/user/{id}

### Response

    HTTP/1.1 201

    { message: "Updated!" }

## LOGGIN

### Request

`POST /auth/userLogin/`

    {
      "email": "example@test.com",
      "password": "mypassword"
    }

    https://api-rest-adoptame.herokuapp.com/api/v1.0/auth/userLogin/

### Response

    HTTP/1.1 201

    {
      "token": token,
      "user": {
          "id": 1,
          "name": "juancito",
          "lastName": "Benalcazar",
          "email": "example@test.com",
          "role": "user"
      }
    }

## Obtener Mascotas

### Request

`GET /pet/`

    https://api-rest-adoptame.herokuapp.com/api/v1.0/pets/

### Response

    HTTP/1.1 201

    {
      "token": token,
      "user": {
          "id": 1,
          "name": "juancito",
          "lastName": "Benalcazar",
          "email": "example@test.com",
          "role": "user"
      }
    }

## Obtener todos los paises

### Request

`GET /countries/`

    https://api-rest-adoptame.herokuapp.com/api/v1.0/countries/

### Response

    HTTP/1.1 200

    [
      {
          "id": "ARG",
          "name": "Argentina"
      },
      {
          "id": "CHL",
          "name": "Chile"
      },
      {
          "id": "COL",
          "name": "Colombia"
      },
      {
          "id": "ECU",
          "name": "Ecuador"
      },
      {
          "id": "PER",
          "name": "Peru"
      }
    ]

## Obtener ciudades por pais

### Request

`GET /cities/{idCountry}`

    https://api-rest-adoptame.herokuapp.com/api/v1.0/cities/{idCountry}

### Response

    HTTP/1.1 200

    [
      {
          "id": 1,
          "name": "28 de Noviembre",
          "countryId": "ARG"
      },
      {
          "id": 2,
          "name": "Abasto",
          "countryId": "ARG"
      },
      {
          "id": 3,
          "name": "Acassuso",
          "countryId": "ARG"
      },
      {
          "id": 4,
          "name": "Acebal",
          "countryId": "ARG"
      },
      {
          "id": 5,
          "name": "Acevedo",
          "countryId": "ARG"
      },
      {...}
    ]

## Obtener tipos de mascotas

### Request

`GET /type-pet/`

    https://api-rest-adoptame.herokuapp.com/api/v1.0/type-pet/

### Response

    HTTP/1.1 200

    [
      {
          "id": "dog",
          "name": "dog"
      },
      {
          "id": "cat",
          "name": "cat"
      }
    ]

## Obtener razas de mascotas por id tipo de mascota

### Request

`GET /breed-pet/{idTipoMascota}`

    https://api-rest-adoptame.herokuapp.com/api/v1.0/breed-pet/{idTipoMascota}

### Response

    HTTP/1.1 200

    [
      {
          "id": 1,
          "name": "affenpinscher",
          "typeId": "dog"
      },
      {
          "id": 2,
          "name": "african",
          "typeId": "dog"
      },
      {
          "id": 3,
          "name": "airedale",
          "typeId": "dog"
      },
      {
          "id": 4,
          "name": "akita",
          "typeId": "dog"
      },
      {
          "id": 5,
          "name": "appenzeller",
          "typeId": "dog"
      },
      {...}
    ]

## Obtener tipos y razas de mascotas

### Request

`GET /breed-pet/`

    https://api-rest-adoptame.herokuapp.com/api/v1.0/breed-pet/

### Response

    HTTP/1.1 200

    [
      {
          "id": 1,
          "name": "affenpinscher",
          "typeId": "dog"
      },
      {
          "id": 2,
          "name": "african",
          "typeId": "dog"
      },
      {
          "id": 103,
          "name": "Arabian Mau",
          "typeId": "cat"
      },
      {
          "id": 104,
          "name": "Australian Mist",
          "typeId": "cat"
      },
      {
          "id": 105,
          "name": "Balinese",
          "typeId": "cat"
      },
      {...}
    ]

