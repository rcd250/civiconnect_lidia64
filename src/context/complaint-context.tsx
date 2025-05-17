import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Complaint, ComplaintResponse, ComplaintStatus } from '@/lib/types';
import { MOCK_COMPLAINTS } from '@/lib/data';
import { useAuth } from './auth-context';
import { useToast } from '@/hooks/use-toast';

interface ComplaintContextType {
  complaints: Complaint[];
  userComplaints: Complaint[];
  loading: boolean;
  getComplaintById: (id: string) => Promise<Complaint | undefined>;
  createComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'responses' | 'status' | 'assignedToAgencyId'>) => Promise<Complaint | undefined>;
  updateComplaintStatus: (id: string, status: ComplaintStatus) => Promise<boolean>;
  assignComplaintToAgency: (complaintId: string, agencyId: string) => Promise<boolean>;
  addResponse: (complaintId: string, message: string, newStatus?: ComplaintStatus) => Promise<boolean>;
  fetchComplaints: () => Promise<void>;
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const ComplaintProvider = ({ children }: {children: ReactNode;}) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      // Check if API is available
      if (!window.ezsite?.apis?.tablePage) {
        console.log('API not available, using mock data');
        setComplaints(MOCK_COMPLAINTS);
        return;
      }

      // Query all complaints
      const { data, error } = await window.ezsite.apis.tablePage(6257, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: "ID",
        IsAsc: false
      });

      if (error) throw error;

      // Format data to match our Complaint type
      const formattedComplaints: Complaint[] = data.List.map((item: any) => ({
        id: item.ID.toString(),
        title: item.title,
        description: item.description,
        userId: item.user_id,
        category: item.category,
        status: item.status as ComplaintStatus,
        createdAt: new Date(item.CreateTime).toISOString(),
        updatedAt: new Date(item.UpdateTime || item.CreateTime).toISOString(),
        agency: item.agency,
        location: item.location,
        assignedToAgencyId: item.agency,
        responses: []
      }));

      // Fetch responses for each complaint
      for (const complaint of formattedComplaints) {
        const { data: responseData, error: responseError } = await window.ezsite.apis.tablePage(6258, {
          PageNo: 1,
          PageSize: 100,
          OrderByField: "ID",
          IsAsc: true,
          Filters: [
          {
            name: "complaint_id",
            op: "Equal",
            value: parseInt(complaint.id)
          }]

        });

        if (!responseError && responseData.List.length > 0) {
          complaint.responses = responseData.List.map((resp: any) => ({
            id: resp.ID.toString(),
            complaintId: complaint.id,
            userId: resp.responder_id,
            userRole: "user", // We'll determine the actual role later
            message: resp.response,
            createdAt: new Date(resp.CreateTime).toISOString()
          }));
        }
      }

      setComplaints(formattedComplaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast({
        title: 'Error',
        description: 'Failed to load complaints. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const userComplaints = user ?
  complaints.filter((complaint) => complaint.userId === user.id) :
  [];

  const getComplaintById = async (id: string) => {
    // If API is not available, use mock data
    if (!window.ezsite?.apis?.tablePage) {
      return complaints.find((c) => c.id === id);
    }

    try {
      const { data, error } = await window.ezsite.apis.tablePage(6257, {
        PageNo: 1,
        PageSize: 1,
        Filters: [
        {
          name: "ID",
          op: "Equal",
          value: parseInt(id)
        }]

      });

      if (error || !data.List.length) return undefined;

      const complaintData = data.List[0];
      const complaint: Complaint = {
        id: complaintData.ID.toString(),
        title: complaintData.title,
        description: complaintData.description,
        userId: complaintData.user_id,
        category: complaintData.category,
        status: complaintData.status as ComplaintStatus,
        createdAt: new Date(complaintData.CreateTime).toISOString(),
        updatedAt: new Date(complaintData.UpdateTime || complaintData.CreateTime).toISOString(),
        agency: complaintData.agency,
        location: complaintData.location,
        assignedToAgencyId: complaintData.agency,
        responses: []
      };

      // Fetch responses for this complaint
      const { data: responseData, error: responseError } = await window.ezsite.apis.tablePage(6258, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: "ID",
        IsAsc: true,
        Filters: [
        {
          name: "complaint_id",
          op: "Equal",
          value: parseInt(id)
        }]

      });

      if (!responseError && responseData.List.length > 0) {
        complaint.responses = responseData.List.map((resp: any) => ({
          id: resp.ID.toString(),
          complaintId: complaint.id,
          userId: resp.responder_id,
          userRole: "user", // We'll determine the actual role later
          message: resp.response,
          createdAt: new Date(resp.CreateTime).toISOString()
        }));
      }

      return complaint;
    } catch (error) {
      console.error('Error fetching complaint:', error);
      toast({
        title: 'Error',
        description: 'Failed to load complaint details. Please try again later.',
        variant: 'destructive'
      });
      return undefined;
    }
  };

  const createComplaint = async (
  newComplaint: Omit<
    Complaint,
    'id' | 'createdAt' | 'updatedAt' | 'responses' | 'status' | 'assignedToAgencyId'>) =>
  {
    if (!user) return undefined;

    // If API is not available, use mock data
    if (!window.ezsite?.apis?.tableCreate) {
      const now = new Date().toISOString();
      const complaint: Complaint = {
        ...newComplaint,
        id: `comp${complaints.length + 1}`,
        createdAt: now,
        updatedAt: now,
        status: 'pending',
        assignedToAgencyId: null,
        responses: []
      };

      setComplaints([...complaints, complaint]);
      toast({
        title: 'Complaint Submitted',
        description: 'Your complaint has been successfully submitted.'
      });
      return complaint;
    }

    try {
      const { error } = await window.ezsite.apis.tableCreate(6257, {
        title: newComplaint.title,
        description: newComplaint.description,
        user_id: user.id,
        category: newComplaint.category,
        status: 'pending',
        agency: newComplaint.agency || '',
        location: newComplaint.location
      });

      if (error) throw error;

      // Refresh the complaints list
      await fetchComplaints();

      toast({
        title: 'Complaint Submitted',
        description: 'Your complaint has been successfully submitted.'
      });

      // Return the last complaint (assuming it's the one we just created)
      return complaints[complaints.length - 1];
    } catch (error) {
      console.error('Error creating complaint:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit complaint. Please try again later.',
        variant: 'destructive'
      });
      return undefined;
    }
  };

  const updateComplaintStatus = async (id: string, status: ComplaintStatus) => {
    // If API is not available, use mock data
    if (!window.ezsite?.apis?.tableUpdate) {
      const complaintIndex = complaints.findIndex((c) => c.id === id);
      if (complaintIndex === -1) return false;

      const updatedComplaints = [...complaints];
      updatedComplaints[complaintIndex] = {
        ...updatedComplaints[complaintIndex],
        status,
        updatedAt: new Date().toISOString()
      };

      setComplaints(updatedComplaints);
      toast({
        title: 'Status Updated',
        description: `Complaint status updated to ${status.replace('_', ' ')}.`
      });
      return true;
    }

    try {
      const { error } = await window.ezsite.apis.tableUpdate(6257, {
        ID: parseInt(id),
        status
      });

      if (error) throw error;

      // Update local state
      const updatedComplaints = complaints.map((c) =>
      c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
      );
      setComplaints(updatedComplaints);

      toast({
        title: 'Status Updated',
        description: `Complaint status updated to ${status.replace('_', ' ')}.`
      });
      return true;
    } catch (error) {
      console.error('Error updating complaint status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update complaint status. Please try again later.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const assignComplaintToAgency = async (complaintId: string, agencyId: string) => {
    // If API is not available, use mock data
    if (!window.ezsite?.apis?.tableUpdate) {
      const complaintIndex = complaints.findIndex((c) => c.id === complaintId);
      if (complaintIndex === -1) return false;

      const updatedComplaints = [...complaints];
      updatedComplaints[complaintIndex] = {
        ...updatedComplaints[complaintIndex],
        assignedToAgencyId: agencyId,
        agency: agencyId,
        status: 'assigned',
        updatedAt: new Date().toISOString()
      };

      setComplaints(updatedComplaints);
      toast({
        title: 'Complaint Assigned',
        description: 'Complaint has been assigned to the agency.'
      });
      return true;
    }

    try {
      const { error } = await window.ezsite.apis.tableUpdate(6257, {
        ID: parseInt(complaintId),
        agency: agencyId,
        status: 'assigned'
      });

      if (error) throw error;

      // Update local state
      const updatedComplaints = complaints.map((c) =>
      c.id === complaintId ? {
        ...c,
        assignedToAgencyId: agencyId,
        agency: agencyId,
        status: 'assigned',
        updatedAt: new Date().toISOString()
      } : c
      );
      setComplaints(updatedComplaints);

      toast({
        title: 'Complaint Assigned',
        description: 'Complaint has been assigned to the agency.'
      });
      return true;
    } catch (error) {
      console.error('Error assigning complaint:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign complaint to agency. Please try again later.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const addResponse = async (complaintId: string, message: string, newStatus?: ComplaintStatus) => {
    if (!user) return false;

    // If API is not available, use mock data
    if (!window.ezsite?.apis?.tableCreate) {
      const complaintIndex = complaints.findIndex((c) => c.id === complaintId);
      if (complaintIndex === -1) return false;

      const response: ComplaintResponse = {
        id: `resp${Date.now()}`,
        complaintId,
        userId: user.id,
        userRole: user.role,
        message,
        createdAt: new Date().toISOString()
      };

      const updatedComplaints = [...complaints];
      updatedComplaints[complaintIndex] = {
        ...updatedComplaints[complaintIndex],
        status: newStatus || updatedComplaints[complaintIndex].status,
        responses: [...updatedComplaints[complaintIndex].responses, response],
        updatedAt: new Date().toISOString()
      };

      setComplaints(updatedComplaints);
      toast({
        title: 'Response Added',
        description: 'Your response has been added to the complaint.'
      });
      return true;
    }

    try {
      // First create the response
      const { error: responseError } = await window.ezsite.apis.tableCreate(6258, {
        complaint_id: parseInt(complaintId),
        response: message,
        responder_id: user.id,
        status_change: newStatus || ''
      });

      if (responseError) throw responseError;

      // If there's a status change, update the complaint
      if (newStatus) {
        const { error: statusError } = await window.ezsite.apis.tableUpdate(6257, {
          ID: parseInt(complaintId),
          status: newStatus
        });

        if (statusError) throw statusError;
      }

      // Refresh the complaint data
      await fetchComplaints();

      toast({
        title: 'Response Added',
        description: 'Your response has been added to the complaint.'
      });
      return true;
    } catch (error) {
      console.error('Error adding response:', error);
      toast({
        title: 'Error',
        description: 'Failed to add response. Please try again later.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const value = {
    complaints,
    userComplaints,
    loading,
    getComplaintById,
    createComplaint,
    updateComplaintStatus,
    assignComplaintToAgency,
    addResponse,
    fetchComplaints
  };

  return <ComplaintContext.Provider value={value}>{children}</ComplaintContext.Provider>;
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (context === undefined) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};