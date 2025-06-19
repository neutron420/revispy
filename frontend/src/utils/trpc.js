// src/utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
export const trpc = createTRPCReact();
export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: import.meta.env.VITE_API_URL || 'http://localhost:3001/trpc', // ✅ Use Vite env var
            headers: () => {
                const token = localStorage.getItem('auth_token');
                return token ? { Authorization: `Bearer ${token}` } : {};
            },
        }),
    ],
});
