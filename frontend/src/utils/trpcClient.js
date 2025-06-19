// utils/trpcClient.ts
import { httpBatchLink } from '@trpc/client';
import { trpc } from './trpc';
export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: import.meta.env.VITE_API_BASE_URL, // ✅ Use env variable
            headers: () => {
                const token = localStorage.getItem('auth_token');
                return token ? { Authorization: `Bearer ${token}` } : {};
            },
        }),
    ],
});
