import { router } from '../trpc';
import { authRouter } from './auth';
import { categoryRouter } from './category'; // ✅ Add this back
export const appRouter = router({
    auth: authRouter,
    category: categoryRouter,
});
