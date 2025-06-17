import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/client";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/auth/tokenService";

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Credenciais inválidas." });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch)
      res.status(401).json({ error: "Credenciais inválidas." });

    const accessToken = generateAccessToken(user.id);

    const refreshToken = generateRefreshToken();

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
};
