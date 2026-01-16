'use client';
import { useState, lazy, Suspense, useCallback } from 'react';
import { Login } from '@/app/login/page';
import { DashboardLayout } from '@/app/dashboard/layout';
import type { User, Role, Tenant } from '@/types/index';

// ✨ OPTIMIZATION: Lazy Loading & Code Splitting
// Load route components only when needed to reduce initial bundle size
const Dashboard = lazy(() =>
  import('./dashboard/page').then((module) => ({ default: module.Dashboard }))
);
const Leads = lazy(() =>
  import('./dashboard/leads/page').then((module) => ({ default: module.Leads }))
);
const CallLogs = lazy(() =>
  import('./dashboard/call-logs/page').then((module) => ({
    default: module.CallLogs,
  }))
);
const Settings = lazy(() =>
  import('./dashboard/settings/page').then((module) => ({
    default: module.Settings,
  }))
);

const PageLoadingFallback = () => (
  <div className='flex items-center justify-center min-h-[400px]'>
    <div className='text-center'>
      <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4'></div>
      <p className='text-sm text-gray-600'>Loading...</p>
    </div>
  </div>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // ✨ OPTIMIZATION: useCallback to prevent unnecessary re-renders
  // Memoize callback functions so child components don't re-render unnecessarily
  const handleLogin = useCallback((tenant: Tenant, role: Role) => {
    setUser({
      name: 'Demo User',
      role,
      tenant,
    });
    setCurrentPage('dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setCurrentPage('dashboard');
  }, []);

  const handleTenantSwitch = useCallback((tenant: Tenant) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, tenant } : null));
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  // Render login screen if not authenticated
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // ✨ OPTIMIZATION: Lazy-loaded page rendering with Suspense
  // Each route component is loaded on-demand and wrapped in Suspense for loading states
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'leads':
        return <Leads user={user} />;
      case 'call-logs':
        return <CallLogs user={user} />;
      case 'settings':
        return user.role === 'Admin' ? (
          <Settings user={user} />
        ) : (
          <Dashboard user={user} />
        );
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <DashboardLayout
      user={user}
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onTenantSwitch={handleTenantSwitch}
      onLogout={handleLogout}
    >
      <Suspense fallback={<PageLoadingFallback />}>{renderPage()}</Suspense>
    </DashboardLayout>
  );
}
