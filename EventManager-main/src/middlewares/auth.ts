import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

type User = {
  id: string;
  email: string;
};

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Obtém o token do cabeçalho de autorização
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") 
    ? authHeader.substring(7) // Remove "Bearer " do início do token
    : null;

  if (!token) {
    return response.status(401).json({ error: "Token não fornecido." });
  }

  try {
    // Decodifica o token
    const decoded = jwt.verify(token, SECRET_KEY) as User;
    
    // Armazena o ID do usuário em response.locals
    response.locals.userId = decoded.id;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Token inválido ou expirado." });
  }
}
