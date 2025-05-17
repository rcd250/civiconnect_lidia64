import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useComplaints } from '@/context/complaint-context';
import { useAuth } from '@/context/auth-context';
import NavBar from '@/components/NavBar';
import ComplaintList from '@/components/ComplaintList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_CATEGORIES } from '@/lib/data';

const DashboardPage = () => {
  const { userComplaints, complaints } = useComplaints();
  const { user, isAdmin, isAgency } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Count complaints by status
  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      under_review: 0,
      assigned: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0
    };

    const complaintsToCount = isAdmin ?
    complaints :
    isAgency ?
    complaints.filter((c) => c.assignedToAgencyId === user?.id) :
    userComplaints;

    complaintsToCount.forEach((complaint) => {
      counts[complaint.status]++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  // Calculate total and resolved complaints
  const totalComplaints = isAdmin ?
  complaints.length :
  isAgency ?
  complaints.filter((c) => c.assignedToAgencyId === user?.id).length :
  userComplaints.length;

  const resolvedComplaints = isAdmin ?
  complaints.filter((c) => c.status === 'resolved' || c.status === 'closed').length :
  isAgency ?
  complaints.filter((c) => (c.status === 'resolved' || c.status === 'closed') && c.assignedToAgencyId === user?.id).length :
  userComplaints.filter((c) => c.status === 'resolved' || c.status === 'closed').length;

  const resolutionRate = totalComplaints ? Math.round(resolvedComplaints / totalComplaints * 100) : 0;

  // Get active complaints (those not closed or resolved)
  const activeComplaints = isAdmin ?
  complaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed') :
  isAgency ?
  complaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed' && c.assignedToAgencyId === user?.id) :
  userComplaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed');

  // Get recent complaints (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentComplaints = isAdmin ?
  complaints.filter((c) => new Date(c.createdAt) >= thirtyDaysAgo) :
  isAgency ?
  complaints.filter((c) => new Date(c.createdAt) >= thirtyDaysAgo && c.assignedToAgencyId === user?.id) :
  userComplaints.filter((c) => new Date(c.createdAt) >= thirtyDaysAgo);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-id="ha8a7xffl" data-path="src/pages/DashboardPage.tsx">
      <NavBar />

      <main className="flex-1 container mx-auto py-8 px-4" data-id="7nhlrhrth" data-path="src/pages/DashboardPage.tsx">
        <div className="mb-8 flex justify-between items-center" data-id="2s028zqof" data-path="src/pages/DashboardPage.tsx">
          <div data-id="35wkql3x8" data-path="src/pages/DashboardPage.tsx">
            <h1 className="text-3xl font-bold" data-id="j6ru8eyy1" data-path="src/pages/DashboardPage.tsx">Dashboard</h1>
            <p className="text-gray-500" data-id="587dg7vqt" data-path="src/pages/DashboardPage.tsx">
              {isAdmin ?
              'Manage and monitor all complaints' :
              isAgency ?
              'Manage complaints assigned to your agency' :
              'Track and manage your complaints'}
            </p>
          </div>
          
          <Link to="/submit">
            <Button>
              {isAdmin ? 'Create Complaint' : 'Submit New Complaint'}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-id="avqkl8iu9" data-path="src/pages/DashboardPage.tsx">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="obm72f7fn" data-path="src/pages/DashboardPage.tsx">{totalComplaints}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="ywt14o91x" data-path="src/pages/DashboardPage.tsx">{activeComplaints.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Resolution Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="o6b7rb57h" data-path="src/pages/DashboardPage.tsx">{resolutionRate}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 md:grid-cols-none h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6" data-id="f507al0co" data-path="src/pages/DashboardPage.tsx">
              <Card>
                <CardHeader>
                  <CardTitle>Status Breakdown</CardTitle>
                  <CardDescription>Number of complaints by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-id="vngzf9wom" data-path="src/pages/DashboardPage.tsx">
                    {Object.entries(statusCounts).map(([status, count]) =>
                    <div key={status} className="flex items-center space-x-2" data-id="or8f6rfn8" data-path="src/pages/DashboardPage.tsx">
                        <div className={`w-3 h-3 rounded-full bg-blue-${300 + Object.keys(statusCounts).indexOf(status) * 100}`} data-id="qdypru3d9" data-path="src/pages/DashboardPage.tsx"></div>
                        <div className="space-y-1" data-id="2jime5zuu" data-path="src/pages/DashboardPage.tsx">
                          <p className="text-sm font-medium capitalize" data-id="y04xtpia2" data-path="src/pages/DashboardPage.tsx">{status.replace('_', ' ')}</p>
                          <p className="text-2xl font-bold" data-id="btaeef140" data-path="src/pages/DashboardPage.tsx">{count}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <ComplaintList
                complaints={isAdmin ? complaints : isAgency ? complaints.filter((c) => c.assignedToAgencyId === user?.id) : userComplaints}
                title={isAdmin ? "All Complaints" : "Your Complaints"} />

            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <ComplaintList
              complaints={activeComplaints}
              title="Active Complaints" />

          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <ComplaintList
              complaints={recentComplaints}
              title="Recent Complaints" />

          </TabsContent>
        </Tabs>
      </main>
    </div>);

};

export default DashboardPage;