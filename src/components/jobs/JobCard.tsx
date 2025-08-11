import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/data/jobs";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }: { job: Job }) {
  const navigate = useNavigate();
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{job.title}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>{job.salary}</span>
              <span>•</span>
              <span>{job.posted}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
              {job.urgent && <Badge className="rounded-full">Яаралтай</Badge>}
            </div>
          </div>
          <Button variant="brand" size="sm" onClick={() => navigate(`/interview?job=${job.id}`)} className="flex-shrink-0">
            Ярилцлагад орох
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
