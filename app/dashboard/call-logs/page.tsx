'use client';


import { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Phone } from 'lucide-react';
import type { User, CallLog, CallOutcome } from '@/types/index';


const mockCallLogs: CallLog[] = [
  {
    id: '1',
    leadName: 'John Smith',
    dateTime: '2026-01-16 10:30 AM',
    duration: '5:23',
    outcome: 'Successful',
    tenant: 'Organization A',
  },
  {
    id: '2',
    leadName: 'Sarah Johnson',
    dateTime: '2026-01-16 11:15 AM',
    duration: '3:45',
    outcome: 'Follow-up Required',
    tenant: 'Organization A',
  },
  {
    id: '3',
    leadName: 'Michael Brown',
    dateTime: '2026-01-16 01:00 PM',
    duration: '7:12',
    outcome: 'Successful',
    tenant: 'Organization A',
  },
  {
    id: '4',
    leadName: 'Emily Davis',
    dateTime: '2026-01-16 02:30 PM',
    duration: '0:00',
    outcome: 'No Answer',
    tenant: 'Organization A',
  },
  {
    id: '5',
    leadName: 'David Wilson',
    dateTime: '2026-01-16 03:45 PM',
    duration: '2:15',
    outcome: 'Voicemail',
    tenant: 'Organization A',
  },
  {
    id: '6',
    leadName: 'Lisa Anderson',
    dateTime: '2026-01-16 09:00 AM',
    duration: '6:30',
    outcome: 'Successful',
    tenant: 'Organization B',
  },
  {
    id: '7',
    leadName: 'Robert Taylor',
    dateTime: '2026-01-16 10:45 AM',
    duration: '4:20',
    outcome: 'Follow-up Required',
    tenant: 'Organization B',
  },
  {
    id: '8',
    leadName: 'Jennifer Martinez',
    dateTime: '2026-01-16 02:00 PM',
    duration: '8:15',
    outcome: 'Successful',
    tenant: 'Organization B',
  },
];


export default function CallLogs() {
  const user = useMemo<User>(() => ({
    id: "1",
    name: "Admin User",
    role: "Admin",
    tenant: "Organization A",
  }), []);
  
  const [loading, setLoading] = useState(false);
  const filteredCallLogs = useMemo(() => {
    if (!user) return [];
    return mockCallLogs.filter((log) => log.tenant === user.tenant);
  }, [user]);
  

  const stats = useMemo(() => {
    return {
      total: filteredCallLogs.length,
      successful: filteredCallLogs.filter((log) => log.outcome === 'Successful')
        .length,
      followUp: filteredCallLogs.filter(
        (log) => log.outcome === 'Follow-up Required'
      ).length,
      noAnswer: filteredCallLogs.filter(
        (log) => log.outcome === 'No Answer' || log.outcome === 'Voicemail'
      ).length,
    };
  }, [filteredCallLogs]);

  const getOutcomeBadgeVariant = useCallback((outcome: CallOutcome) => {
    switch (outcome) {
      case 'Successful':
        return 'success';
      case 'Follow-up Required':
        return 'warning';
      case 'No Answer':
      case 'Voicemail':
        return 'default';
      default:
        return 'default';
    }
  }, []);

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-2'>Call Logs</h1>
        <p className='text-sm text-gray-600'>
          View call history and outcomes for {user.tenant}
        </p>
      </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Calls</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Successful</p>
          <p className="text-2xl font-semibold text-green-600">
            {stats.successful}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Follow-up Required</p>
          <p className="text-2xl font-semibold text-yellow-600">
            {stats.followUp}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">No Answer / Voicemail</p>
          <p className="text-2xl font-semibold text-gray-600">
            {stats.noAnswer}
          </p>
        </div>
      </div>

      {/* Call Logs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6">
            <Skeleton className='h-6 w-6 animate-spin text-gray-400' />
          </div>
        ) : filteredCallLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Phone className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">No call logs found</h3>
            <p className="text-sm text-gray-500">
              No call history available for this organization.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Call Duration</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCallLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <span className="font-medium text-gray-900">{log.leadName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{log.dateTime}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 font-mono">{log.duration}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getOutcomeBadgeVariant(log.outcome)}>
                      {log.outcome}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

          {/* Read-only notice */}
          {filteredCallLogs.length > 0 && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            Call logs are read-only for all users. This data is automatically generated from call activities.
          </p>
        </div>
      )}
    </div>
  );
}
