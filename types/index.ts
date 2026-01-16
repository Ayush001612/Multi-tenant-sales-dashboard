export type Role = 'Admin' | 'Agent';
export type Tenant = 'Organization A' | 'Organization B';
export type LeadStatus = 'New' | 'Contacted' | 'Converted';
export type CallOutcome = 'Successful' | 'No Answer' | 'Voicemail' | 'Follow-up Required';

export interface User {
  name: string;
  role: Role;
  tenant: Tenant;
}

export interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
  status: LeadStatus;
  tenant: Tenant;
}

export interface CallLog {
  id: string;
  leadName: string;
  dateTime: string;
  duration: string;
  outcome: CallOutcome;
  tenant: Tenant;
}
