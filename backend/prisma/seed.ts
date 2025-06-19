import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.userCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Generate 100 categories with unique names (faster method)
  const categories = Array.from({ length: 100 }).map(() => {
    const name = `${faker.commerce.department()} ${faker.string.uuid().slice(0, 4)}`;
    return {
      name,
      description: faker.commerce.productDescription(),
      imageUrl: `https://placehold.co/300x200?text=${encodeURIComponent(name)}`,
    };
  });

  // Insert categories
  const createdCategories = await prisma.category.createMany({ data: categories });
  console.log(`Created ${createdCategories.count} categories`);

  // Create a test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: '$2a$10$roNeWgMsKrnMQzFBdnQYtOHj4CDF3JfgdvFxAXJ0XS2H8FQ0QJZK', // hashed "password123"
    },
  });

  console.log(`Created user: ${testUser.email}`);
}

main()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
