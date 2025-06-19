import { jsx as _jsx } from "react/jsx-runtime";
// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';
import { trpc, trpcClient } from './utils/trpc'; // ✅ import trpc and trpcClient
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(trpc.Provider, { client: trpcClient, queryClient: queryClient, children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }) }) }) }));
