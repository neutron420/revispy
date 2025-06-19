import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header';
import { CategoryCard } from '../components/CategoryCard';
import { trpc } from '@/utils/trpc';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const { data: stats, isLoading: loading, error, refetch } = trpc.category.getStats.useQuery();
  const [activeSection, setActiveSection] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
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
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => setActiveSection(category.name.toLowerCase())}
                />
              ))}
            </div>
            {/* You can also add recent activity and quick actions here */}
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">{activeSection}</h2>
            <p className="text-gray-600">This section will be implemented later.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-16 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center"
              >
                <span className="mr-3">🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">Here’s what’s happening today.</p>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
