import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token ausente." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { refreshToken },
    });

    if (!user) {
      return res.status(403).json({ error: "Refresh token inválido." });
    }

    const newAccessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao renovar token." });
  }
};
