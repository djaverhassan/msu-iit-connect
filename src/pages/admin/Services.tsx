import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Services = () => {
  const requests = [
    {
      id: 1,
      studentName: "John Doe",
      studentId: "2021-001",
      service: "Request ID",
      status: "pending",
      date: "2024-03-15",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "2021-002",
      service: "Request COR",
      status: "approved",
      date: "2024-03-14",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentId: "2021-003",
      service: "Request Transcript",
      status: "processing",
      date: "2024-03-13",
    },
  ];

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-600",
      approved: "bg-green-600",
      processing: "bg-blue-600",
      rejected: "bg-red-600",
    };
    return <Badge className={colors[status] || ""}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">E-Service Requests</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>All Service Requests</CardTitle>
            <CardDescription>Manage and process e-service requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.studentName}</TableCell>
                    <TableCell>{request.studentId}</TableCell>
                    <TableCell>{request.service}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Process</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
