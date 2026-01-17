'use client';
import { useState, lazy, Suspense, useCallback } from 'react';
import  Login  from '@/app/login/page';
import  DashboardLayout  from '@/app/dashboard/Dashboardlayout';
import type { User, Role, Tenant } from '@/types/index';

// ✨ OPTIMIZATION: Lazy Loading & Code Splitting
// Load route components only when needed to reduce initial bundle size
const Dashboard = lazy(() =>
  import('./dashboard/page')
);
const Leads = lazy(() =>
  import('./dashboard/leads/page')
);
const CallLogs = lazy(() =>
  import('./dashboard/call-logs/page')
  );
const Settings = lazy(() =>
  import('./dashboard/settings/page')
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


  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <Leads  />;
      case 'call-logs':
        return <CallLogs />;
      case 'settings':
        return user.role === 'Admin' ? (
          <Settings />
        ) : (
          <Dashboard  />
        );
      default:
        return <Dashboard  />;
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
