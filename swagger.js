const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
  info: {
    title: "Kapipay API",
    version: "1.0.0",
    description: "Simple API Documentation.",
    termsOfService: "http://develop.davibernardo.xyz/terms",
    contact: {
      email: "davi.bernardo@linkapi.com.br"
    },
  },
  externalDocs: {
    "description": "Find out more about Swagger",
    "url": "http://swagger.io"
  },
  servers: [{ url: "http://localhost:5050" }],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "Authorization",
      "description": "Authorization actions"
    },
    {
      "name": "Digital Account Actions",
      "description": "Account Actions"
    },
    {
      "name": "Companys",
      "description": "Company Actions"
    },
    {
      "name": "Invoice",
      "description": "Invoice Actions"
    },
    {
      "name": "Others",
      "description": "others routes"
    }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }
  },
  definitions: {
    Parents: {
      father: "Simon Doe",
      mother: "Marie Doe"
    },

    AddUser: {
      name: "João do Caminhão",
      email: "joaodocaminhao@uol.com.br",
      password: "soujoao123"
    },
    UserCreated: {
      name: "João do Caminhão",
      email: "joaodocaminhao@uol.com.br",
      id: "string",
      createdAt: "string",
      token: "string"
    },
    UserProfile: {
      name: "João do Caminhão",
      email: "joaodocaminhao@uol.com.br",
      id: "numericaltoken",
      createdAt: "date",
      token: "Bearer token"
    },

  }
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server')
});