import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useComplaints } from '@/context/complaint-context';
import { useAuth } from '@/context/auth-context';
import NavBar from '@/components/NavBar';
import ComplaintList from '@/components/ComplaintList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_AGENCIES } from '@/lib/data';

const AdminDashboardPage = () => {
  const { complaints } = useComplaints();
  const { user, isAdmin, isAgency } = useAuth();
  const [activeTab, setActiveTab] = useState('unassigned');

  // Redirect if user is not admin or agency
  if (!isAdmin && !isAgency) {
    return <Navigate to="/dashboard" />;
  }

  // Filter complaints based on user role and selected tab
  const getFilteredComplaints = () => {
    if (isAdmin) {
      switch (activeTab) {
        case 'unassigned':
          return complaints.filter((c) => !c.assignedToAgencyId && c.status !== 'closed');
        case 'assigned':
          return complaints.filter((c) => c.assignedToAgencyId && c.status !== 'resolved' && c.status !== 'closed');
        case 'resolved':
          return complaints.filter((c) => c.status === 'resolved' || c.status === 'closed');
        default:
          return complaints;
      }
    } else if (isAgency) {
      // For agency users, show only their assigned complaints
      switch (activeTab) {
        case 'unassigned':
          return []; // Agencies can't see unassigned complaints
        case 'assigned':
          return complaints.filter((c) =>
          c.assignedToAgencyId === user?.id &&
          c.status !== 'resolved' &&
          c.status !== 'closed'
          );
        case 'resolved':
          return complaints.filter((c) =>
          c.assignedToAgencyId === user?.id && (
          c.status === 'resolved' || c.status === 'closed')
          );
        default:
          return complaints.filter((c) => c.assignedToAgencyId === user?.id);
      }
    }

    return [];
  };

  const filteredComplaints = getFilteredComplaints();

  // Statistics for the dashboard
  const totalComplaints = isAdmin ?
  complaints.length :
  complaints.filter((c) => c.assignedToAgencyId === user?.id).length;

  const resolvedComplaints = isAdmin ?
  complaints.filter((c) => c.status === 'resolved' || c.status === 'closed').length :
  complaints.filter((c) =>
  (c.status === 'resolved' || c.status === 'closed') &&
  c.assignedToAgencyId === user?.id
  ).length;

  const pendingComplaints = isAdmin ?
  complaints.filter((c) => !c.assignedToAgencyId).length :
  0;

  const resolutionRate = totalComplaints > 0 ?
  Math.round(resolvedComplaints / totalComplaints * 100) :
  0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-id="u10v2zfhg" data-path="src/pages/AdminDashboardPage.tsx">
      <NavBar />

      <main className="flex-1 container mx-auto py-8 px-4" data-id="2k3wzesah" data-path="src/pages/AdminDashboardPage.tsx">
        <div className="mb-8" data-id="a5zoox808" data-path="src/pages/AdminDashboardPage.tsx">
          <h1 className="text-3xl font-bold" data-id="796xh3wy0" data-path="src/pages/AdminDashboardPage.tsx">Admin Dashboard</h1>
          <p className="text-gray-500" data-id="h858a9oka" data-path="src/pages/AdminDashboardPage.tsx">
            {isAdmin ?
            'Manage all complaints and assign them to agencies' :
            `Manage complaints assigned to ${user?.name}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-id="w0rik7mev" data-path="src/pages/AdminDashboardPage.tsx">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="buc4qzrtx" data-path="src/pages/AdminDashboardPage.tsx">{totalComplaints}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {isAdmin ? 'Unassigned Complaints' : 'Active Complaints'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="kmd2rg4ew" data-path="src/pages/AdminDashboardPage.tsx">
                {isAdmin ?
                pendingComplaints :
                totalComplaints - resolvedComplaints}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Resolution Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="shacwgico" data-path="src/pages/AdminDashboardPage.tsx">{resolutionRate}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 md:grid-cols-none h-auto">
            {isAdmin && <TabsTrigger value="unassigned">Unassigned</TabsTrigger>}
            <TabsTrigger value="assigned">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          {isAdmin &&
          <TabsContent value="unassigned" className="mt-6">
              <div className="mb-4 flex justify-between items-center" data-id="pu9ikx93y" data-path="src/pages/AdminDashboardPage.tsx">
                <h2 className="text-xl font-semibold" data-id="bosnbpnbo" data-path="src/pages/AdminDashboardPage.tsx">Unassigned Complaints</h2>
              </div>
              <ComplaintList
              complaints={filteredComplaints}
              title=""
              showFilters={false} />

            </TabsContent>
          }
          
          <TabsContent value="assigned" className="mt-6">
            <div className="mb-4 flex justify-between items-center" data-id="ebet3biho" data-path="src/pages/AdminDashboardPage.tsx">
              <h2 className="text-xl font-semibold" data-id="dxxhr3wsu" data-path="src/pages/AdminDashboardPage.tsx">
                {isAdmin ? 'Assigned Complaints' : 'Your Assigned Complaints'}
              </h2>
            </div>
            <ComplaintList
              complaints={filteredComplaints}
              title=""
              showFilters={false} />

          </TabsContent>
          
          <TabsContent value="resolved" className="mt-6">
            <div className="mb-4 flex justify-between items-center" data-id="uzm8atntx" data-path="src/pages/AdminDashboardPage.tsx">
              <h2 className="text-xl font-semibold" data-id="hgxj2uwvn" data-path="src/pages/AdminDashboardPage.tsx">Resolved Complaints</h2>
            </div>
            <ComplaintList
              complaints={filteredComplaints}
              title=""
              showFilters={false} />

          </TabsContent>
        </Tabs>
      </main>
    </div>);

};

export default AdminDashboardPage;