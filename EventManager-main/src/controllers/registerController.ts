import { Request, Response } from "express";
import prisma from "../../prisma/db";
import bcrypt from "bcryptjs";

export async function registerController(request: Request, response: Response) {
  const { name, email, password } = request.body;

  // Verificar se todos os campos estão presentes
  if (!name || !email || !password) {
    return response.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // Verificar se o usuário já existe
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    // Se o usuário existir, retorna um erro
    if (userExists) {
      return response.status(400).json({ error: "Usuário já existe." });
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criando o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Retornando informações do usuário criado, sem a senha
    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return response.status(500).json({ error: "Erro interno do servidor. Tente novamente." });
  }
}
