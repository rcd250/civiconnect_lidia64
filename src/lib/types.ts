export type ComplaintStatus =
'pending' |
'under_review' |
'assigned' |
'in_progress' |
'resolved' |
'closed';

export type UserRole = 'citizen' | 'admin' | 'agency';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  agencyId: string;
}

export interface Agency {
  id: string;
  name: string;
  description: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedToAgencyId: string | null;
  responses: ComplaintResponse[];
  attachments?: string[];
  location?: {
    address: string;
    lat?: number;
    lng?: number;
  };
}

export interface ComplaintResponse {
  id: string;
  complaintId: string;
  userId: string;
  userRole: UserRole;
  message: string;
  createdAt: string;
}