import "dotenv/config";
import swaggerAutogen from 'swagger-autogen';
let { NODE_ENV } = process.env;
const doc = {
  info: {
    title: 'Api Rest Adoptame',
    description: 'Documentación_',
  },
  host: NODE_ENV === 'production'
    ? 'api-rest-adoptame.up.railway.app'
    : 'localhost:5000',
  schemes: [NODE_ENV === 'production' ? 'https' : 'http'],
};

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  NODE_ENV === 'production'
    ? await import('./index.js')
    : console.log('Documentación generada :)');
});