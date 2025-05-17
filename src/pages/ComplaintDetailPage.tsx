import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useComplaints } from '@/context/complaint-context';
import { useAuth } from '@/context/auth-context';
import NavBar from '@/components/NavBar';
import StatusBadge from '@/components/StatusBadge';
import StatusStepper from '@/components/StatusStepper';
import ResponseForm from '@/components/ResponseForm';
import {
  getAgencyById,
  getCategoryById,
  getUserById } from
'@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from
'@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { ComplaintStatus } from '@/lib/types';

const ComplaintDetailPage = () => {
  const { id } = useParams<{id: string;}>();
  const { getComplaintById, updateComplaintStatus, assignComplaintToAgency } = useComplaints();
  const { user, isAuthenticated, isAdmin, isAgency } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!id) {
    return <Navigate to="/dashboard" />;
  }

  const complaint = getComplaintById(id);

  if (!complaint) {
    return <Navigate to="/dashboard" />;
  }

  const category = getCategoryById(complaint.categoryId);
  const submittedBy = getUserById(complaint.userId);
  const assignedAgency = complaint.assignedToAgencyId ?
  getAgencyById(complaint.assignedToAgencyId) :
  null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleStatusChange = (status: string) => {
    setIsUpdating(true);
    try {
      updateComplaintStatus(id, status as ComplaintStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const canManageComplaint = isAdmin ||
  isAgency && complaint.assignedToAgencyId === user?.id ||
  complaint.userId === user?.id;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-id="o5i66u8al" data-path="src/pages/ComplaintDetailPage.tsx">
      <NavBar />

      <main className="flex-1 container mx-auto py-8 px-4" data-id="t70j4ipof" data-path="src/pages/ComplaintDetailPage.tsx">
        <div className="mb-6" data-id="d4udew82a" data-path="src/pages/ComplaintDetailPage.tsx">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6" data-id="nafdlgh76" data-path="src/pages/ComplaintDetailPage.tsx">
          {/* Main Complaint Details */}
          <div className="md:col-span-2 space-y-6" data-id="bw7onzsqz" data-path="src/pages/ComplaintDetailPage.tsx">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between" data-id="e26c7fyub" data-path="src/pages/ComplaintDetailPage.tsx">
                  <div data-id="yeaxjud84" data-path="src/pages/ComplaintDetailPage.tsx">
                    <CardTitle className="text-2xl">{complaint.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Submitted on {formatDate(complaint.createdAt)} by {submittedBy?.name || 'Unknown User'}
                    </CardDescription>
                  </div>
                  <StatusBadge status={complaint.status} />
                </div>
              </CardHeader>
              <CardContent>
                <StatusStepper currentStatus={complaint.status} />
                
                <div className="space-y-4 mt-6" data-id="5g1jhq3xq" data-path="src/pages/ComplaintDetailPage.tsx">
                  <div data-id="qacpe53c0" data-path="src/pages/ComplaintDetailPage.tsx">
                    <h3 className="text-sm font-medium text-gray-500" data-id="deberocjp" data-path="src/pages/ComplaintDetailPage.tsx">Description</h3>
                    <p className="mt-2 whitespace-pre-line" data-id="ocuydyghy" data-path="src/pages/ComplaintDetailPage.tsx">{complaint.description}</p>
                  </div>
                  
                  {complaint.location &&
                  <div data-id="jmewvpvby" data-path="src/pages/ComplaintDetailPage.tsx">
                      <h3 className="text-sm font-medium text-gray-500" data-id="o0u52emu8" data-path="src/pages/ComplaintDetailPage.tsx">Location</h3>
                      <p className="mt-2" data-id="0b0t50vpi" data-path="src/pages/ComplaintDetailPage.tsx">{complaint.location.address}</p>
                    </div>
                  }
                </div>
              </CardContent>
            </Card>

            {/* Responses */}
            <Card>
              <CardHeader>
                <CardTitle>Responses</CardTitle>
                <CardDescription>
                  Communication history for this complaint
                </CardDescription>
              </CardHeader>
              <CardContent>
                {complaint.responses.length === 0 ?
                <div className="text-center py-8 text-gray-500" data-id="v7x45ph6w" data-path="src/pages/ComplaintDetailPage.tsx">
                    No responses yet
                  </div> :

                <div className="space-y-4" data-id="rawfyhn6x" data-path="src/pages/ComplaintDetailPage.tsx">
                    {complaint.responses.map((response) => {
                    const responseUser = getUserById(response.userId);

                    return (
                      <div key={response.id} className="p-4 border rounded-lg bg-gray-50" data-id="ni3vq4sqo" data-path="src/pages/ComplaintDetailPage.tsx">
                          <div className="flex justify-between items-start mb-2" data-id="a4jxba3gm" data-path="src/pages/ComplaintDetailPage.tsx">
                            <div className="flex items-center space-x-2" data-id="2cs1iugcx" data-path="src/pages/ComplaintDetailPage.tsx">
                              <div className="font-medium" data-id="c74l3gauw" data-path="src/pages/ComplaintDetailPage.tsx">
                                {responseUser?.name || 'Unknown User'}
                              </div>
                              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded" data-id="leipgpe4a" data-path="src/pages/ComplaintDetailPage.tsx">
                                {response.userRole}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500" data-id="6jhdl4hr6" data-path="src/pages/ComplaintDetailPage.tsx">
                              {formatDate(response.createdAt)}
                            </div>
                          </div>
                          <p className="whitespace-pre-line" data-id="4zvd8mivt" data-path="src/pages/ComplaintDetailPage.tsx">{response.message}</p>
                        </div>);

                  })}
                  </div>
                }
              </CardContent>
              <CardFooter className="border-t pt-6 block">
                {canManageComplaint &&
                <ResponseForm
                  complaintId={id} />

                }
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6" data-id="undt0hbt4" data-path="src/pages/ComplaintDetailPage.tsx">
            {/* Status and Category */}
            <Card>
              <CardHeader>
                <CardTitle>Complaint Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" data-id="qtw0x6v40" data-path="src/pages/ComplaintDetailPage.tsx">
                  <div data-id="1f8te39bz" data-path="src/pages/ComplaintDetailPage.tsx">
                    <h3 className="text-sm font-medium text-gray-500" data-id="yjuvfl8fi" data-path="src/pages/ComplaintDetailPage.tsx">Category</h3>
                    <p className="mt-1 font-medium" data-id="ffnq4xkvi" data-path="src/pages/ComplaintDetailPage.tsx">{category?.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-500" data-id="sk4upvu4o" data-path="src/pages/ComplaintDetailPage.tsx">{category?.description}</p>
                  </div>
                  
                  <Separator />

                  <div data-id="nbfrmrzbv" data-path="src/pages/ComplaintDetailPage.tsx">
                    <h3 className="text-sm font-medium text-gray-500" data-id="tf1qshcns" data-path="src/pages/ComplaintDetailPage.tsx">Status</h3>
                    <div className="mt-1" data-id="uxlzqel5r" data-path="src/pages/ComplaintDetailPage.tsx">
                      <StatusBadge status={complaint.status} />
                    </div>
                  </div>
                  
                  <Separator />

                  <div data-id="sjuhl1cha" data-path="src/pages/ComplaintDetailPage.tsx">
                    <h3 className="text-sm font-medium text-gray-500" data-id="1mzg1gwjf" data-path="src/pages/ComplaintDetailPage.tsx">Assigned Agency</h3>
                    <p className="mt-1" data-id="oljeax6eg" data-path="src/pages/ComplaintDetailPage.tsx">
                      {assignedAgency ?
                      assignedAgency.name :
                      'Not assigned yet'}
                    </p>
                  </div>
                  
                  <Separator />

                  <div data-id="u1rjc1rg7" data-path="src/pages/ComplaintDetailPage.tsx">
                    <h3 className="text-sm font-medium text-gray-500" data-id="fi56vdn0a" data-path="src/pages/ComplaintDetailPage.tsx">Last Updated</h3>
                    <p className="mt-1" data-id="o802ncse5" data-path="src/pages/ComplaintDetailPage.tsx">{formatDate(complaint.updatedAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Controls */}
            {(isAdmin || isAgency) &&
            <Card>
                <CardHeader>
                  <CardTitle>Admin Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isAdmin &&
                <div data-id="5sfzvf8jx" data-path="src/pages/ComplaintDetailPage.tsx">
                      <h3 className="text-sm font-medium mb-2" data-id="y68br83uz" data-path="src/pages/ComplaintDetailPage.tsx">Update Status</h3>
                      <Select
                    value={complaint.status}
                    onValueChange={handleStatusChange}
                    disabled={isUpdating}>

                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="under_review">Under Review</SelectItem>
                          <SelectItem value="assigned">Assigned</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                }

                  {isAgency && complaint.assignedToAgencyId === user?.id &&
                <div data-id="6uk46o3xa" data-path="src/pages/ComplaintDetailPage.tsx">
                      <h3 className="text-sm font-medium mb-2" data-id="hp3i7mvmb" data-path="src/pages/ComplaintDetailPage.tsx">Update Status</h3>
                      <Select
                    value={complaint.status}
                    onValueChange={handleStatusChange}
                    disabled={isUpdating || complaint.status === 'closed'}>

                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                }
                </CardContent>
              </Card>
            }
          </div>
        </div>
      </main>
    </div>);

};

export default ComplaintDetailPage;