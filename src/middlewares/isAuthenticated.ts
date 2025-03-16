import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { InternalServerError } from "../shared/erros";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res
      .status(401)
      .json({
        message: "Autenticação necessária.",
        status_code: 401,
      })
      .end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
    req.id_user = sub;

    return next();
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      message: "Erro na conexão com Banco ou na Query.",
      cause: error,
    });
    console.error(publicErrorObject);
    res.status(publicErrorObject.statusCode).json(publicErrorObject);
  }
}
