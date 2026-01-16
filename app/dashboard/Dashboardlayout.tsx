'use client';
import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Phone,
  Settings,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { User, Tenant, Role } from '@/types/index';

interface DashboardLayoutProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onTenantSwitch: (tenant: Tenant) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function DashboardLayout({
  user,
  currentPage,
  onNavigate,
  onTenantSwitch,
  onLogout,
  children,
}: DashboardLayoutProps) {
  const [isTenantSwitcherOpen, setIsTenantSwitcherOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'call-logs', label: 'Call Logs', icon: Phone },
    { id: 'settings', label: 'Settings', icon: Settings, adminOnly: true },
  ];

  const isAdmin = user.role === 'Admin';

  return (
    <div className='min-h-screen bg-gray-50'>
      <aside className='fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200'>
        <div className='p-6 border-b border-gray-200'>
          <h1 className='text-xl font-semibold text-gray-900'>
            Sales Dashboard
          </h1>
        </div>

        <nav className='p-4 space-y-1'>
        {navItems.map((item) => {
            const Icon = item.icon;
            const isDisabled = item.adminOnly && !isAdmin;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && onNavigate(item.id)}
                disabled={isDisabled}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : isDisabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={isDisabled ? 'Admin access required' : ''}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {isDisabled && (
                  <span className="ml-auto text-xs text-gray-400">Admin</span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* main content */}

      <div className='ml-64'>
        {/* Top Header */}
        <header className='bg-white border-b border-gray-200 px-8 py-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-sm font-medium text-gray-900">{user.tenant}</h2>
                  <Badge variant={isAdmin ? 'admin' : 'agent'}>{user.role}</Badge>
                </div>
                <p className="text-xs text-gray-500">Active Organization</p>

                </div>
            </div>
            <div className='flex items-center gap-4'>
                  {/* Tenant Switcher */}
                  <div className='relative'>
                  <button
                  onClick={() => setIsTenantSwitcherOpen(!isTenantSwitcherOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <span>Switch Organization</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isTenantSwitcherOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="p-2">
                      {(['Organization A', 'Organization B'] as Tenant[]).map((tenant) => (
                        <button
                          key={tenant}
                          onClick={() => {
                            onTenantSwitch(tenant);
                            setIsTenantSwitcherOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            tenant === user.tenant
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {tenant}
                          {tenant === user.tenant && (
                            <span className="ml-2 text-xs">(Current)</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                  </div>

                  {/* user info */}

                  <div className='flex items-center gap-3 pl-4 border-l border-gray-200'>
                    <div className='text-right'>
                    <p className="text-sm font-medium text-gray-900">Demo User</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <button
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                  </div>
            </div>
        </div>
      </header>
      {/* Page Content */}
      <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
