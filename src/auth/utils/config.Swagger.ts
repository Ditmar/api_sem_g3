const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Autentication',
        version: '1.0.0',
        description: 'The Api is for login user',
      },
    },
    apis: ['./src/routes/*.ts'], // Ajusta la ruta según tu estructura de archivos
  };    
  
  module.exports = swaggerOptions;
  