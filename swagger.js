import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Api Rest Adoptame',
    description: 'La documentacion',
  },
  host: 'api-rest-adoptame.up.railway.app',
  schemes: ['https'],
};

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen()(outputFile, endpointsFiles, doc);
