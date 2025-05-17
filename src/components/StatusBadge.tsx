import { Badge } from '@/components/ui/badge';
import { ComplaintStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: ComplaintStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getVariant = () => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'under_review':
        return 'outline';
      case 'assigned':
        return 'default';
      case 'in_progress':
        return 'default';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getLabel = () => {
    return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Badge variant={getVariant() as any} className="capitalize">
      {getLabel()}
    </Badge>);

};

export default StatusBadge;