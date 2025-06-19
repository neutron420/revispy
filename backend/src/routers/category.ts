import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '../utils/db';

const getCategoriesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(6),
});

const toggleCategorySchema = z.object({
  categoryId: z.string(),
});

interface CategoryWithUsers {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  users: { id: string }[];
}

export const categoryRouter = router({
  getCategories: protectedProcedure
    .input(getCategoriesSchema)
    .query(async ({ input, ctx }) => {
      const { page, limit } = input;
      const skip = (page - 1) * limit;

      // Ensure userId exists
      if (!ctx.userId) {
        throw new Error('User not authenticated');
      }

      const totalCategories = await prisma.category.count();

      const categories = await prisma.category.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          users: {
            where: { userId: ctx.userId },
            select: { id: true },
          },
        },
      });

      const transformedCategories = categories.map((category: CategoryWithUsers) => ({
        id: category.id,
        name: category.name,
        description: category.description || '',
        imageUrl: category.imageUrl || '',
        isSelected: category.users.length > 0,
      }));

      return {
        categories: transformedCategories,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCategories / limit),
          totalItems: totalCategories,
          hasNext: page < Math.ceil(totalCategories / limit),
          hasPrev: page > 1,
        },
      };
    }),

  toggleCategory: protectedProcedure
    .input(toggleCategorySchema)
    .mutation(async ({ input, ctx }) => {
      const { categoryId } = input;

      // Ensure userId exists
      if (!ctx.userId) {
        throw new Error('User not authenticated');
      }

      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        throw new Error('Category not found');
      }

      const existingSelection = await prisma.userCategory.findUnique({
        where: {
          userId_categoryId: {
            userId: ctx.userId,
            categoryId,
          },
        },
      });

      if (existingSelection) {
        await prisma.userCategory.delete({
          where: {
            userId_categoryId: {
              userId: ctx.userId,
              categoryId,
            },
          },
        });

        return {
          success: true,
          action: 'removed',
          message: `${category.name} removed from your interests`,
        };
      } else {
        await prisma.userCategory.create({
          data: {
            userId: ctx.userId,
            categoryId,
          },
        });

        return {
          success: true,
          action: 'added',
          message: `${category.name} added to your interests`,
        };
      }
    }),

  getUserCategories: protectedProcedure.query(async ({ ctx }) => {
    // Ensure userId exists
    if (!ctx.userId) {
      throw new Error('User not authenticated');
    }

    const userCategories = await prisma.userCategory.findMany({
      where: { userId: ctx.userId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      categories: userCategories.map((uc) => ({
        id: uc.category.id,
        name: uc.category.name,
        description: uc.category.description || '',
        imageUrl: uc.category.imageUrl || '',
      })),
      total: userCategories.length,
    };
  }),

  getStats: publicProcedure.query(async () => {
    const totalCategories = await prisma.category.count();
    const totalUsers = await prisma.user.count();
    const totalSelections = await prisma.userCategory.count();

    return {
      totalCategories,
      totalUsers,
      totalSelections,
    };
  }),
});