import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import routes from "./routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/", (req: Request, res: Response): void => {
  res.send("API Funcionando");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
