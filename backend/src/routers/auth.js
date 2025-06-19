import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../utils/db';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { TRPCError } from '@trpc/server';
const signupSchema = z.object({
    email: z.string().email('Invalid email format'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});
export const authRouter = router({
    signup: publicProcedure
        .input(signupSchema)
        .mutation(async ({ input }) => {
        const { email, firstName, lastName, password } = input;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'User with this email already exists',
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        });
        const token = generateToken(user.id);
        return {
            user,
            token,
            message: 'User created successfully',
        };
    }),
    login: publicProcedure
        .input(loginSchema)
        .mutation(async ({ input }) => {
        const { email, password } = input;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid email or password',
            });
        }
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid email or password',
            });
        }
        const token = generateToken(user.id);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
            },
            token,
            message: 'Login successful',
        };
    }),
    me: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.isAuthenticated || !ctx.userId) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Not authenticated',
            });
        }
        const user = await prisma.user.findUnique({
            where: { id: ctx.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        });
        if (!user) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found',
            });
        }
        return user;
    }),
    logout: publicProcedure.mutation(() => {
        return { success: true, message: 'Logged out successfully' };
    }),
});
