'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Lock, Users } from 'lucide-react';
import type { User, Lead, LeadStatus } from '@/types/index';


const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    phoneNumber: '+1 (555) 123-4567',
    status: 'New',
    tenant: 'Organization A',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phoneNumber: '+1 (555) 234-5678',
    status: 'Contacted',
    tenant: 'Organization A',
  },
  {
    id: '3',
    name: 'Michael Brown',
    phoneNumber: '+1 (555) 345-6789',
    status: 'Converted',
    tenant: 'Organization A',
  },
  {
    id: '4',
    name: 'Emily Davis',
    phoneNumber: '+1 (555) 456-7890',
    status: 'New',
    tenant: 'Organization A',
  },
  {
    id: '5',
    name: 'David Wilson',
    phoneNumber: '+1 (555) 567-8901',
    status: 'Contacted',
    tenant: 'Organization A',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    phoneNumber: '+1 (555) 678-9012',
    status: 'New',
    tenant: 'Organization B',
  },
  {
    id: '7',
    name: 'Robert Taylor',
    phoneNumber: '+1 (555) 789-0123',
    status: 'Converted',
    tenant: 'Organization B',
  },
  {
    id: '8',
    name: 'Jennifer Martinez',
    phoneNumber: '+1 (555) 890-1234',
    status: 'Contacted',
    tenant: 'Organization B',
  },
];

export default function Leads() {
  const user = {
    id: "1",
    name: "Admin User",
    role: "Admin",
    tenant: "Organization A",
  };
 
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
 


  const isAdmin = user?.role === 'Admin';

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => lead.tenant === user.tenant)
      .filter((lead) => statusFilter === 'All' || lead.status === statusFilter);
  }, [leads, user.tenant, statusFilter]);

  const handleStatusChange = useCallback(
    (leadId: string, newStatus: LeadStatus) => {
      if (!isAdmin) return;

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
    },
    [isAdmin]
  );

  const getStatusBadgeVariant = useCallback((status: LeadStatus) => {
    switch (status) {
      case 'New':
        return 'info';
      case 'Contacted':
        return 'warning';
      case 'Converted':
        return 'success';
      default:
        return 'default';
    }
  }, []);

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Leads</h1>
        <p className='text-sm text-gray-600'>
          Manage and track your sales leads for {user.tenant}
        </p>
      </div>

      {/* filter bar */}
      <div className='bg-white rounded-lg border border-gray-200 p-4 mb-6'>
        <div className='flex items-center justify-between'>
          <div className='flex item-center gap-4'>
            <label
              htmlFor='status-filter'
              className='text-sm font-medium text-gray-700'
            >
              Status Filter:
            </label>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as LeadStatus | 'All')
              }
            >
              <SelectTrigger id='status-filter' className='w-48'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='All'>All</SelectItem>
                <SelectItem value='New'>New</SelectItem>
                <SelectItem value='Contacted'>Contacted</SelectItem>
                <SelectItem value='Converted'>Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='text-sm text-gray-600'>
            {filteredLeads.length}{' '}
            {filteredLeads.length === 1 ? 'lead' : 'leads'}
          </div>
        </div>
      </div>

      {/* Leads Table */}

      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
        {loading ? (
          <div className='p-6'>
            <Skeleton className='h-6 w-6 animate-spin text-gray-400' />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className='text-center py-12 '>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4'>
              <Users className='w-8 h-8 text-gray-400' />
            </div>
            <h3 className='text-sm font-medium text-gray-900 mb-1'>
              No leads found
            </h3>
            <p className='text-sm text-gray-500'>
              {statusFilter === 'All'
                ? 'No leads available for this organization.'
                : `No leads with status "${statusFilter}" found.`}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                {isAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <span className='font-medium text-gray-900'>
                      {lead.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className='text-gray-600'>{lead.phoneNumber}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(lead.status)}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Select
                        value={lead.status}
                        onValueChange={(value) =>
                          handleStatusChange(lead.id, value as LeadStatus)
                        }
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='New'>New</SelectItem>
                          <SelectItem value='Contacted'>Contacted</SelectItem>
                          <SelectItem value='Converted'>Converted</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      {!isAdmin && filteredLeads.length > 0 && (
        <div className='mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex items-center gap-3'>
            <Lock className='w-5 h-5 text-blue-600' />
            <div>
              <p className='text-sm font-medium text-blue-900'>
                View-Only Access
              </p>
              <p className='text-xs text-blue-700 mt-1'>
                You have read-only access to leads. Contact your administrator
                to edit lead statuses.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
