import { router } from '../trpc';
import { authRouter } from './auth';
import { categoryRouter } from './category';

export const appRouter = router({
  auth: authRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;