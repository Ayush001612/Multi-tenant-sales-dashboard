'use client';
import { Users, Phone, TrendingUp, Clock } from 'lucide-react';
import type { User } from '@/types/index';


interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const stats = [
    {
      label: 'Total Leads',
      value: '127',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Calls',
      value: '342',
      icon: Phone,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Conversion Rate',
      value: '24%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Avg Call Duration',
      value: '4:32',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Dashboard</h1>
        <p className='text-sm text-gray-600'>
          Welcome back! Here&apos;s an overview of {user.tenant}&apos;s performance.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className='bg-white rounded-lg border border-gray-200 p-6'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className='text-sm text-gray-600 mb-1'>{stat.label}</p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className='mt-8 bg-white rounded-lg border border-gray-200 p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Quick Actions
        </h2>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <button className='p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
              <Users className='w-5 h-5 text-blue-600 mb-2' />
              <p className='text-sm font-medium text-gray-900'>View Leads</p>
              <p className='text-xs text-gray-500 mt-1'>
                Manage your lead pipeline
              </p>
            </button>
            <button className='p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
              <Phone className='w-5 h-5 text-green-600 mb-2' />
              <p className='text-sm font-medium text-gray-900'>Call Logs</p>
              <p className='text-xs text-gray-500 mt-1'>Review call history</p>
            </button>
            <button
              className={`p-4 text-left border border-gray-200 rounded-lg transition-colors ${
                user.role === 'Admin'
                  ? 'hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={user.role !== 'Admin'}
            >
              <TrendingUp className='w-5 h-5 text-purple-600 mb-2' />
              <p className='text-sm font-medium text-gray-900'>Settings</p>
              <p className='text-xs text-gray-500 mt-1'>
                {user.role === 'Admin'
                  ? 'Configure dashboard'
                  : 'Admin access required'}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
