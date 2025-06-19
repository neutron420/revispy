import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header';
import { CategoryCard } from '../components/CategoryCard';
import { trpc } from '@/utils/trpc';
const Dashboard = () => {
    const { user, logout } = useAuth();
    const { data: stats, isLoading: loading, error, refetch } = trpc.category.getStats.useQuery();
    const [activeSection, setActiveSection] = useState('overview');
    const handleLogout = async () => {
        try {
            await logout();
        }
        catch (err) {
            console.error('Logout error:', err);
        }
    };
    const categories = [
        {
            id: '1',
            name: 'Projects',
            description: 'Manage your active projects',
            icon: '📊',
            itemCount: stats?.totalSelections || 0,
            color: '#3B82F6',
        },
        {
            id: '2',
            name: 'Tasks',
            description: 'View and manage tasks',
            icon: '✅',
            itemCount: 0,
            color: '#10B981',
        },
        {
            id: '3',
            name: 'Team',
            description: 'Manage team members',
            icon: '👥',
            itemCount: stats?.totalUsers || 0,
            color: '#8B5CF6',
        },
        {
            id: '4',
            name: 'Notifications',
            description: 'Check your notifications',
            icon: '🔔',
            itemCount: 0,
            color: '#F97316',
        },
    ];
    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: '🏠' },
        { id: 'projects', label: 'Projects', icon: '📊' },
        { id: 'tasks', label: 'Tasks', icon: '✅' },
        { id: 'team', label: 'Team', icon: '👥' },
        { id: 'reports', label: 'Reports', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];
    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (_jsx("div", { className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: categories.map((category) => (_jsx(CategoryCard, { category: category, onClick: () => setActiveSection(category.name.toLowerCase()) }, category.id))) }) }));
            default:
                return (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4 capitalize", children: activeSection }), _jsx("p", { className: "text-gray-600", children: "This section will be implemented later." })] }));
        }
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" }), _jsx("p", { className: "mt-4 text-gray-600", children: "Loading dashboard..." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-red-500 text-xl mb-4", children: "\u26A0\uFE0F" }), _jsx("p", { className: "text-red-600 mb-4", children: error.message }), _jsx("button", { onClick: () => refetch(), className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors", children: "Retry" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-100", children: [_jsx(Header, {}), _jsxs("div", { className: "flex", children: [_jsx("div", { className: "w-64 bg-white shadow-lg h-screen fixed left-0 top-16 overflow-y-auto", children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("div", { className: "w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold", children: user?.name?.charAt(0).toUpperCase() || 'U' }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "text-sm font-medium text-gray-800", children: user?.name || 'User' }), _jsx("p", { className: "text-xs text-gray-500", children: user?.email || 'user@example.com' })] })] }), _jsx("nav", { className: "space-y-2", children: sidebarItems.map((item) => (_jsxs("button", { onClick: () => setActiveSection(item.id), className: `w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${activeSection === item.id
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'}`, children: [_jsx("span", { className: "mr-3", children: item.icon }), item.label] }, item.id))) }), _jsx("div", { className: "mt-8 pt-4 border-t border-gray-200", children: _jsxs("button", { onClick: handleLogout, className: "w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center", children: [_jsx("span", { className: "mr-3", children: "\uD83D\uDEAA" }), "Logout"] }) })] }) }), _jsx("div", { className: "ml-64 flex-1 p-6 mt-16", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("h1", { className: "text-3xl font-bold text-gray-800", children: ["Welcome back, ", user?.name || 'User', "!"] }), _jsx("p", { className: "text-gray-600 mt-1", children: "Here\u2019s what\u2019s happening today." })] }), renderContent()] }) })] })] }));
};
export default Dashboard;
