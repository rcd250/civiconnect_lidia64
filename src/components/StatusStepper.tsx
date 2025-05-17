import { ComplaintStatus } from '@/lib/types';
import { CheckIcon } from 'lucide-react';

interface StatusStepperProps {
  currentStatus: ComplaintStatus;
}

const statusOrder: ComplaintStatus[] = [
'pending',
'under_review',
'assigned',
'in_progress',
'resolved',
'closed'];


const statusLabels: Record<ComplaintStatus, string> = {
  pending: 'Pending',
  under_review: 'Under Review',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed'
};

const StatusStepper = ({ currentStatus }: StatusStepperProps) => {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="my-6" data-id="j2sqr9u7k" data-path="src/components/StatusStepper.tsx">
      <div className="flex justify-between" data-id="vsqz1o0sd" data-path="src/components/StatusStepper.tsx">
        {statusOrder.map((status, index) => {
          const isActive = index <= currentIndex;
          const isCurrentStep = status === currentStatus;

          return (
            <div
              key={status}
              className="relative flex flex-col items-center"
              style={{ width: `${100 / statusOrder.length}%` }} data-id="1mkkp9fp1" data-path="src/components/StatusStepper.tsx">

              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${isActive ?
                'bg-blue-600 text-white' :
                'bg-gray-200 text-gray-400'}
                  ${isCurrentStep ? 'ring-2 ring-blue-300 ring-offset-2' : ''}
                `} data-id="b1chce2es" data-path="src/components/StatusStepper.tsx">

                {isActive ? <CheckIcon size={16} /> : index + 1}
              </div>
              
              <div className="text-xs mt-2 text-center font-medium" data-id="g07ep3j0o" data-path="src/components/StatusStepper.tsx">
                {statusLabels[status]}
              </div>
              
              {index < statusOrder.length - 1 &&
              <div
                className={`absolute h-0.5 top-4 left-1/2 right-0 -mr-4
                    ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'}
                  `}
                style={{ width: '100%' }} data-id="66otbrz2g" data-path="src/components/StatusStepper.tsx" />

              }
            </div>);

        })}
      </div>
    </div>);

};

export default StatusStepper;