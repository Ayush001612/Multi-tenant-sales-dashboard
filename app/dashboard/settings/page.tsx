'use client';

import { Settings as SettingsIcon, Shield, Bell, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { User } from '@/types/index';

interface SettingsProps {
  user: User;
}

export default function Settings({ user }: SettingsProps) {
  const settingsSections = [
    {
      id: 'organization',
      title: 'Organization Settings',
      description: 'Manage organization details and preferences',
      icon: Database,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'permissions',
      title: 'Permissions & Roles',
      description: 'Configure user roles and access controls',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Set up alerts and notification preferences',
      icon: Bell,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <h1 className='text-2xl font-semibold text-gray-900'>Settings</h1>
          <Badge variant='admin'>Admin Only</Badge>
        </div>
        <p className='text-sm text-gray-600'>
          Configure settings and preferences for {user.tenant}
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              className='bg-white rounded-lg border border-gray-200 p-6 text-left hover:border-gray-300 hover:shadow-sm transition-all'
            >
              <div
                className={`inline-flex p-3 rounded-lg ${section.bgColor} mb-4`}
              >
                <Icon className={`w-6 h-6 ${section.color}`} />
              </div>
              <h3 className='text-base font-semibold text-gray-900 mb-2'>
                {section.title}
              </h3>
              <p className='text-sm text-gray-600'>{section.description}</p>
            </button>
          );
        })}
      </div>

      <div className='mt-8 bg-white rounded-lg border border-gray-200 p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Quick Settings
        </h2>
        <div className='space-y-4'>
          <div className='flex items-center justify-between py-3 border-b border-gray-200'>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                Email Notifications
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                Receive email alerts for new leads and calls
              </p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input type='checkbox' className='sr-only peer' defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className='flex items-center justify-between py-3 border-b border-gray-200'>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                Auto-assign Leads
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                Automatically distribute new leads to agents
              </p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input type='checkbox' className='sr-only peer' />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className='flex items-center justify-between py-3'>
            <div>
              <p className='text-sm font-medium text-gray-900'>
                Call Recording
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                Enable call recording for compliance
              </p>
            </div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input type='checkbox' className='sr-only peer' defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
