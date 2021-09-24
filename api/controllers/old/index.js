const fs = require('fs');
const path = require('path');


//percorre os arquivos da pasta que não começam com "." e nem index.js
//ou seja todos os outros controllers
module.exports = app => {
  fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
    .forEach(file => require(path.resolve(__dirname, file))(app));
}