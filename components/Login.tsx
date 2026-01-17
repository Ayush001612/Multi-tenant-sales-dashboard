'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { Role, Tenant } from '@/types/index';

interface LoginProps {
  onLogin: (tenant: Tenant, role: Role) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [selectedTenant, setSelectedTenant] =
    useState<Tenant>('Organization A');
  const [selectedRole, setSelectedRole] = useState<Role>('Admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedTenant, selectedRole);
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='max-w-md w-full'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
              Sales Dashboard
            </h1>
            <p className='text-sm text-gray-600'>
              Sign in to your organization
            </p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='tenant'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Organization
              </label>
              <Select
                value={selectedTenant}
                onValueChange={(value) => setSelectedTenant(value as Tenant)}
              >
                <SelectTrigger id='tenant' className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Organization A'>Organization A</SelectItem>
                  <SelectItem value='Organization B'>Organization B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor='role'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Role
              </label>
              <Select
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value as Role)}
              >
                <SelectTrigger id='role' className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Admin'>Admin</SelectItem>
                  <SelectItem value='Agent'>Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type='submit' className='w-full' size='lg'>
              Sign In
            </Button>
          </form>
          <div className='mt-6 pt-6 border-t border-gray-200'>
            <p className='text-xs text-gray-500 text-center'>
              Select an organization and role to continue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}