import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Complaint } from '@/lib/types';
import { getCategoryById } from '@/lib/data';
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
'@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { Input } from '@/components/ui/input';

interface ComplaintListProps {
  complaints: Complaint[];
  title?: string;
  showFilters?: boolean;
}

const ComplaintList = ({ complaints, title = 'Complaints', showFilters = true }: ComplaintListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4" data-id="nuz8nhsjq" data-path="src/components/ComplaintList.tsx">
      <div className="flex justify-between items-center" data-id="qf7nltk9g" data-path="src/components/ComplaintList.tsx">
        <h2 className="text-2xl font-bold" data-id="303wtx0o2" data-path="src/components/ComplaintList.tsx">{title}</h2>
        {showFilters &&
        <div className="flex gap-2" data-id="tyy889jpu" data-path="src/components/ComplaintList.tsx">
            <Input
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm" />

            <Select
            value={statusFilter}
            onValueChange={setStatusFilter}>

              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
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
      </div>

      {filteredComplaints.length === 0 ?
      <div className="text-center py-10 border rounded-lg bg-gray-50" data-id="wynwm30yc" data-path="src/components/ComplaintList.tsx">
          <p className="text-gray-500" data-id="c63fnqabj" data-path="src/components/ComplaintList.tsx">No complaints found</p>
        </div> :

      <div className="rounded-md border" data-id="s7ftdy82i" data-path="src/components/ComplaintList.tsx">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => {
              const category = getCategoryById(complaint.categoryId);

              return (
                <TableRow key={complaint.id}>
                    <TableCell className="font-medium">
                      {complaint.title}
                    </TableCell>
                    <TableCell>{category?.name || 'Unknown'}</TableCell>
                    <TableCell>{formatDate(complaint.createdAt)}</TableCell>
                    <TableCell>
                      <StatusBadge status={complaint.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/complaint/${complaint.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>);

            })}
            </TableBody>
          </Table>
        </div>
      }
    </div>);

};

export default ComplaintList;