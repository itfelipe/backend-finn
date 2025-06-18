// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = 1;
  const categories = await prisma.category.findMany();
  console.log(categories);

  if (categories.length === 0) {
    throw new Error(
      "Nenhuma categoria encontrada. Crie categorias antes de rodar o seed."
    );
  }

  const budgets = Array.from({ length: 15 }, (_, i) => {
    const category = categories[i % categories.length];
    const limit = 500 + Math.floor(Math.random() * 1000);
    const month = `2024-${String((i % 12) + 1).padStart(2, "0")}`;

    return {
      categoryId: category.id,
      limit,
      month,
      userId,
    };
  });

  await prisma.budget.createMany({ data: budgets });
  console.log("💰 Budgets inseridos com sucesso!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
