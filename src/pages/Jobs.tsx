import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import FilterBar, { Filters } from "@/components/jobs/FilterBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Clock, 
  DollarSign, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
  Users,
  CheckCircle
} from "lucide-react";

// Enhanced job type with detailed information
interface DetailedJob {
  id: string;
  title: string;
  company: string;
  salary: string;
  posted: string;
  tags: string[];
  urgent?: boolean;
  remote?: boolean;
  branchId: string;
  // Enhanced details
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  location?: string;
  employmentType?: string;
  experience?: string;
  companyLogo?: string;
}

// Enhanced job data with detailed information
const detailedJobs: DetailedJob[] = [
  {
    id: "analyst-1",
    title: "Санхүүгийн шинжээч",
    company: "ТЭСО Групп",
    salary: "₮ 4,000,000",
    posted: "1 өдрийн өмнө",
    tags: ["Бүтэн цаг", "Эхлэх яаралтай"],
    urgent: true,
    branchId: "ub-center",
    location: "Улаанбаатар хот",
    employmentType: "Бүтэн цаг",
    experience: "1-3 жил",
    description: "Компанийн санхүүгийн тайлан, мэдээлэлд гүнзгийрүүлсэн дүн шинжилгээ хийх, үндэслэлтэй дүгнэлт гаргах.",
    requirements: [
      "Санхүү, нягтлан бодох бүртгэлийн чиглэлээр их дээд сургууль төгссөн",
      "Excel, PowerPoint програмыг чөлөөтэй хэрэглэдэг",
      "Англи хэлний мэдлэгтэй",
      "Багаар ажиллах чадвартай"
    ],
    responsibilities: [
      "Санхүүгийн тайлан бэлтгэх",
      "Орлого зарлагын дүн шинжилгээ хийх",
      "Төсөвт хяналт тавих"
    ]
  },
  {
    id: "developer-1",
    title: "Вэб хөгжүүлэгч",
    company: "TechSoft LLC",
    salary: "₮ 3,500,000",
    posted: "2 өдрийн өмнө",
    tags: ["Бүтэн цаг", "Зайнаас"],
    remote: true,
    branchId: "ub-tech",
    location: "Улаанбаатар хот / Зайнаас",
    employmentType: "Бүтэн цаг",
    experience: "2-4 жил",
    description: "Орчин үеийн вэб технологи ашиглан динамик вэбсайт, програм хөгжүүлэх.",
    requirements: [
      "React, Node.js туршлагатай",
      "JavaScript, TypeScript мэддэг",
      "Git ашиглаж чаддаг",
      "Англи хэлний ажлын түвшинтэй"
    ],
    responsibilities: [
      "Фронт-энд хөгжүүлэлт",
      "API интеграци",
      "Кодын чанарыг хангах"
    ]
  },
  {
    id: "manager-1",
    title: "Борлуулалтын менежер",
    company: "MegaMart",
    salary: "₮ 2,800,000",
    posted: "3 өдрийн өмнө",
    tags: ["Бүтэн цаг"],
    branchId: "ub-sales",
    location: "Улаанбаатар хот",
    employmentType: "Бүтэн цаг",
    experience: "3-5 жил",
    description: "Борлуулалтын багийг удирдаж, борлуулалтын зорилт биелүүлэх.",
    requirements: [
      "Борлуулалтын салбарт 3+ жилийн туршлагатай",
      "Удирдлагын туршлагатай",
      "Харилцааны өндөр чадвартай",
      "CRM системтэй ажилласан туршлагатай"
    ],
    responsibilities: [
      "Борлуулалтын багийн удирдлага",
      "Зорилт тавих, хянах",
      "Үйлчлүүлэгчидтэй харилцах"
    ]
  },
  {
    id: "hr-1",
    title: "Хүний нөөцийн мэргэжилтэн",
    company: "Global Solutions",
    salary: "₮ 3,200,000",
    posted: "5 өдрийн өмнө",
    tags: ["Бүтэн цаг", "Эхлэх яаралтай"],
    urgent: true,
    branchId: "ub-hr",
    location: "Улаанбаатар хот",
    employmentType: "Бүтэн цаг",
    experience: "2-5 жил",
    description: "Хүний нөөцийн удирдлага, ажилтан сонгон шалгаруулалт, сургалт зохион байгуулах.",
    requirements: [
      "HR салбарт 3-7 жилийн туршлагатай",
      "Сургалт зохион байгуулсан туршлагатай",
      "Англи хэл чөлөөтэй",
      "Харилцааны өндөр чадвартай"
    ]
  }
];

export default function Jobs() {
  const [filters, setFilters] = useState<Filters>({ q: "", type: "all" });
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Jobz – Ажлын байр";
  }, []);

  const filteredJobs = useMemo(() => {
    return detailedJobs.filter((job) => {
      const matchQ = (job.title + job.company).toLowerCase().includes(filters.q.toLowerCase());
      const matchType =
        filters.type === "all" ||
        (filters.type === "urgent" && job.urgent) ||
        (filters.type === "remote" && job.remote);
      return matchQ && matchType;
    });
  }, [filters]);

  const toggleJobExpansion = (jobId: string) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedJobs(newExpanded);
  };

  const isJobExpanded = (jobId: string) => expandedJobs.has(jobId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">Ажлын зарууд</h1>
        <FilterBar value={filters} onChange={setFilters} />
        
        <div className="mt-4 grid gap-3">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="shadow-sm hover:shadow-md transition-all duration-200">
              {/* Minimized Header - Always Visible */}
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50/50 transition-colors duration-200"
                onClick={() => toggleJobExpansion(job.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight truncate">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="truncate">{job.company}</span>
                        {job.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Яаралтай
                          </Badge>
                        )}
                      </CardDescription>
                      
                      {/* Quick Info in minimized state */}
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium text-green-600">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isJobExpanded(job.id) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>

              {/* Action Button - Always Visible in minimized state */}
              {!isJobExpanded(job.id) && (
                <CardContent className="pt-0 pb-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card expansion when clicking button
                      navigate(`/interview?job=${job.id}`);
                    }}
                  >
                    Ярилцлагад орох
                  </Button>
                </CardContent>
              )}

              {/* Expanded Details - Only visible when expanded */}
              {isJobExpanded(job.id) && (
                <CardContent className="pt-0 pb-4 space-y-4 border-t">
                  {/* Job Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{job.employmentType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{job.experience} туршлага</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{job.posted}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Description */}
                  {job.description && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <span className="text-blue-500">⟫</span>
                        АЖЛЫН ТАЙЛБАР
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  )}

                  {/* Requirements */}
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <span className="text-purple-500">⟫</span>
                        ШААРДЛАГА
                      </h4>
                      <div className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <div key={index} className="flex items-start gap-3 text-sm">
                            <span className="text-muted-foreground mt-1">•</span>
                            <span className="text-muted-foreground leading-relaxed">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <span className="text-green-500">⟫</span>
                        ҮҮРЭГ ХАРИУЦЛАГА
                      </h4>
                      <div className="space-y-2">
                        {job.responsibilities.map((resp, index) => (
                          <div key={index} className="flex items-start gap-3 text-sm">
                            <span className="text-muted-foreground mt-1">•</span>
                            <span className="text-muted-foreground leading-relaxed">{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button in expanded state */}
                  <div className="pt-2">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/interview?job=${job.id}`);
                      }}
                    >
                      Ярилцлагад орох
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              {filters.q ? 'Хайлт олдсонгүй' : 'Ажлын зар байхгүй байна'}
            </p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}