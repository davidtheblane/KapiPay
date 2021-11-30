const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.AUTH_TOKEN_SECRET_KEY;


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader)

  if (!authHeader)
    return res.status(400).send({ err: "Token não inserido, verifique o cabeçalho." });

  //divide o token pelo espaço (bearer" "token)
  const parts = authHeader.split(' ');

  if (parts.length !== 2)
    return res.status(401).send({ err: "Token mal formatado, deve conter 2 partes. Ex:'Bearer token'" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ err: "Token mal formatado, deve começar por 'Bearer'" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)

      return res.status(401).send({ err: "Token de autenticação inválido" });

    req.userId = decoded.id

    return next();
  });

};