import { initTRPC, TRPCError } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { AuthContext, createAuthContext } from './middlewares/verifyToken';

// Create context for tRPC
export const createContext = ({ req, res }: CreateExpressContextOptions): AuthContext => {
  return createAuthContext(req);
};

type Context = AuthContext;

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Base router and procedures
export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure middleware
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.isAuthenticated || !ctx.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }
  
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);