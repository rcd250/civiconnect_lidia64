import NavBar from '@/components/NavBar';
import ComplaintForm from '@/components/ComplaintForm';
import { useAuth } from '@/context/auth-context';
import { Navigate } from 'react-router-dom';

const SubmitComplaintPage = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-id="6efqxyppp" data-path="src/pages/SubmitComplaintPage.tsx">
      <NavBar />
      <main className="flex-1 container mx-auto py-8 px-4" data-id="6a0h8il3g" data-path="src/pages/SubmitComplaintPage.tsx">
        <div className="mb-8" data-id="xp9v2a4fr" data-path="src/pages/SubmitComplaintPage.tsx">
          <h1 className="text-3xl font-bold" data-id="vplrcc0nj" data-path="src/pages/SubmitComplaintPage.tsx">Submit a Complaint</h1>
          <p className="text-gray-500" data-id="a0sqn9wyh" data-path="src/pages/SubmitComplaintPage.tsx">
            Provide details about your issue so we can address it properly
          </p>
        </div>
        
        <ComplaintForm />
      </main>
    </div>);

};

export default SubmitComplaintPage;