const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
  info: {
    version: "1.0.0",
    title: "Kapipay API",
    description: "Simple API Documentation."
  },
  host: "localhost:5050",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "Authorization",
      "description": "Authorization to use API"
    },
    {
      "name": "Login & Register",
      "description": "Login Actions"
    },
    {
      "name": "Account",
      "description": "Account Actions"
    },
    {
      "name": "Companys",
      "description": "Company Actions"
    },
    {
      "name": "Invoice",
      "description": "Invoice Actions"
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
    User: {
      name: "Jhon Doe",
      age: 29,
      parents: {
        $ref: '#/definitions/Parents'
      },
      diplomas: [
        {
          school: "XYZ University",
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: "XYZ Company"
          }
        }
      ]
    },
    AddUser: {
      $name: "Jhon Doe",
      $age: 29,
      about: ""
    }
  }
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server')
});