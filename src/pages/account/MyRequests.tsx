import { ArrowLeft, FileText, AlertCircle, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface ServiceRequest {
  id: string;
  service_type: string;
  purpose: string | null;
  additional_notes: string | null;
  status: string;
  created_at: string;
  name: string;
  email: string;
}

interface Issue {
  id: string;
  category: string | null;
  message: string;
  status: string;
  created_at: string;
  name: string;
  email: string;
}

const serviceTypeLabels: Record<string, string> = {
  student_id: "Request Student ID",
  cor: "Request COR",
  transcript: "Request Transcript",
  enrollment: "Enrollment Services",
  grades: "Grade Viewing",
};

const MyRequests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      
      // Fetch service requests
      const { data: requestsData, error: requestsError } = await supabase
        .from('service_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (requestsError) {
        console.error("Error fetching service requests:", requestsError);
      } else {
        setServiceRequests(requestsData || []);
      }

      // Fetch issues
      const { data: issuesData, error: issuesError } = await supabase
        .from('issues')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (issuesError) {
        console.error("Error fetching issues:", issuesError);
      } else {
        setIssues(issuesData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [user, navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Processing
          </Badge>
        );
      case 'completed':
      case 'resolved':
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status === 'completed' ? 'Completed' : 'Resolved'}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const pendingRequestsCount = serviceRequests.filter(r => r.status === 'pending' || r.status === 'processing').length;
  const pendingIssuesCount = issues.filter(i => i.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary-foreground hover:bg-primary-foreground/10 -ml-2 mb-4"
            onClick={() => navigate('/account')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Account
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8" />
            <h1 className="text-2xl font-bold">My Requests</h1>
          </div>
          <p className="text-primary-foreground/80 text-sm">Track your service requests and reported issues</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="services" className="relative">
                Service Requests
                {pendingRequestsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {pendingRequestsCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="issues" className="relative">
                Reported Issues
                {pendingIssuesCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {pendingIssuesCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-3">
              {serviceRequests.length === 0 ? (
                <Card className="p-6 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <h3 className="font-medium text-foreground mb-1">No Service Requests</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You haven't submitted any service requests yet.
                  </p>
                  <Button onClick={() => navigate('/e-services')}>
                    Browse E-Services
                  </Button>
                </Card>
              ) : (
                serviceRequests.map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        {serviceTypeLabels[request.service_type] || request.service_type}
                      </h3>
                      {getStatusBadge(request.status)}
                    </div>
                    {request.purpose && (
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {request.purpose}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Submitted: {format(new Date(request.created_at), 'MMM d, yyyy h:mm a')}
                    </p>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="issues" className="space-y-3">
              {issues.length === 0 ? (
                <Card className="p-6 text-center">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <h3 className="font-medium text-foreground mb-1">No Reported Issues</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You haven't reported any issues yet.
                  </p>
                  <Button onClick={() => navigate('/report-issue')}>
                    Report an Issue
                  </Button>
                </Card>
              ) : (
                issues.map((issue) => (
                  <Card key={issue.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        {issue.category || "General Issue"}
                      </h3>
                      {getStatusBadge(issue.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {issue.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {format(new Date(issue.created_at), 'MMM d, yyyy h:mm a')}
                    </p>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MyRequests;