import prisma from "../src/prisma/client";

async function seedCategories() {
  const categories = [
    "Alimentação",
    "Transporte",
    "Saúde",
    "Educação",
    "Lazer",
    "Moradia",
    "Investimentos",
    "Assinaturas",
    "Compras",
    "Outros",
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Categorias criadas!");
}

seedCategories().finally(() => prisma.$disconnect());
