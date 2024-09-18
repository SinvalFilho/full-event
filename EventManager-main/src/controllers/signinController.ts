import { Request, Response } from "express";
import prisma from "../../prisma/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Use uma variável de ambiente para a chave secreta
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

export async function signinController(request: Request, response: Response) {
  const { email, password } = request.body;

  try {
    // Procura o usuário por email
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    // Se não foi encontrado nenhum usuário com o email, então retornamos erro
    if (!userExists) {
      return response.status(401).json({ error: "Credenciais inválidas" });
    }

    // Comparando a senha criptografada do usuário com a senha passando na requisição
    const isValidPassword = await bcrypt.compare(password, userExists.password);

    // Se a senha não for válida, então retorna erro
    if (!isValidPassword) {
      return response.status(401).json({ error: "Credenciais inválidas" });
    }

    // Gerando o token
    const token = jwt.sign(
      { id: userExists.id, name: userExists.name, email: userExists.email },
      SECRET_KEY,
      { expiresIn: '1h' } // Define um tempo de expiração para o token
    );

    return response.json({ token }); // Retorna o token em um objeto
  } catch (error) {
    console.error("Erro ao fazer login", error);
    return response.status(500).json({ error: "Erro interno do servidor" });
  }
}
