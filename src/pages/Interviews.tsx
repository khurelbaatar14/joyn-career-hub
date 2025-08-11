import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { 
  Search,
  Calendar,
  Clock,
  MapPin,
  Building2,
  MessageSquare,
  Video,
  Phone,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users
} from "lucide-react";

interface Interview {
  id: string;
  companyName: string;
  companyLogo?: string;
  position: string;
  branch: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  interviewer?: string;
  notes?: string;
}

// Mock interview data based on your UI
const mockInterviews: Interview[] = [
  {
    id: '1',
    companyName: 'Central TV',
    position: 'Сэтгүүлч',
    branch: 'Төв оффис',
    date: '2025-08-10',
    time: '14:00',
    type: 'video',
    status: 'scheduled',
    interviewer: 'Б.Болор',
    notes: 'Журналистын ажлын туршлагын талаар асуух'
  },
  {
    id: '2',
    companyName: 'Central TV',
    position: 'Борлуулалт, маркетинг',
    branch: 'Төв оффис',
    date: '2025-08-12',
    time: '10:00',
    type: 'in-person',
    status: 'scheduled',
    interviewer: 'Д.Дулам'
  },
  {
    id: '3',
    companyName: 'Central TV',
    position: 'Эвлүүлэгч',
    branch: 'Төв оффис',
    date: '2025-08-08',
    time: '11:00',
    type: 'video',
    status: 'completed',
    interviewer: 'С.Сарантуяа'
  },
  {
    id: '4',
    companyName: 'Central TV',
    position: 'Дизайнер',
    branch: 'Төв оффис',
    date: '2025-08-09',
    time: '15:30',
    type: 'phone',
    status: 'completed',
    interviewer: 'Ц.Цэнд'
  },
  {
    id: '5',
    companyName: 'Номин Холдинг',
    position: 'Худий нөөцийн боловсрол',
    branch: 'Номин Төв',
    date: '2025-08-15',
    time: '09:00',
    type: 'in-person',
    status: 'scheduled',
    interviewer: 'О.Оюунчимэг'
  },
  {
    id: '6',
    companyName: 'Pocket',
    position: 'Ахлах менежер',
    branch: 'Төв салбар',
    date: '2025-08-13',
    time: '16:00',
    type: 'video',
    status: 'pending',
    interviewer: 'Г.Ганбат'
  },
  {
    id: '7',
    companyName: 'Uniservice Solutions',
    position: 'Сонгон шалгаруулалт',
    branch: 'Багшийн дээд салбар',
    date: '2025-08-11',
    time: '13:00',
    type: 'in-person',
    status: 'scheduled',
    interviewer: 'Б.Баярсайхан'
  },
  {
    id: '8',
    companyName: 'TЭСО Групп',
    position: 'Барилга угсралтын менежер',
    branch: 'Төв оффис',
    date: '2025-08-14',
    time: '10:30',
    type: 'video',
    status: 'scheduled',
    interviewer: 'Н.Нарантуяа'
  }
];

export default function Interviews() {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    document.title = "Jobz – Ярилцлагууд";
  }, []);

  // Filter interviews based on search and status
  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = 
      interview.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Calendar className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Дууссан';
      case 'cancelled':
        return 'Цуцлагдсан';
      case 'pending':
        return 'Хүлээгдэж буй';
      default:
        return 'Товлогдсон';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'video':
        return 'Видео дуудлага';
      case 'phone':
        return 'Утасны дуудлага';
      default:
        return 'Биечлэн';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('mn-MN', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">Ярилцлагууд</h1>
        <p className="mb-6 text-muted-foreground">Таны бүх ярилцлагуудын жагсаалт.</p>

        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Компани эсвэл ажлын байр хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { value: 'all', label: 'Бүгд' },
              { value: 'scheduled', label: 'Товлогдсон' },
              { value: 'completed', label: 'Дууссан' },
              { value: 'pending', label: 'Хүлээгдэж буй' },
              { value: 'cancelled', label: 'Цуцлагдсан' }
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={filterStatus === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(filter.value)}
                className="whitespace-nowrap"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Interviews List */}
        <div className="space-y-4">
          {filteredInterviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {searchTerm ? 'Хайлт олдсонгүй' : 'Ярилцлага байхгүй байна'}
              </p>
            </div>
          ) : (
            filteredInterviews.map((interview) => (
              <Card key={interview.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{interview.position}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span>{interview.companyName}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {interview.branch}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(interview.status)} className="flex items-center gap-1">
                      {getStatusIcon(interview.status)}
                      {getStatusText(interview.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(interview.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{interview.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getTypeIcon(interview.type)}
                      <span>{getTypeText(interview.type)}</span>
                    </div>
                    {interview.interviewer && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{interview.interviewer}</span>
                      </div>
                    )}
                  </div>

                  {interview.notes && (
                    <div className="bg-muted/30 rounded-md p-3 mb-3">
                      <p className="text-sm text-muted-foreground">{interview.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {interview.status === 'scheduled' && (
                      <>
                        <Button size="sm" className="flex-1">
                          Нэгдэх
                        </Button>
                        <Button variant="outline" size="sm">
                          Цуцлах
                        </Button>
                      </>
                    )}
                    {interview.status === 'completed' && (
                      <Button variant="outline" size="sm" className="w-full">
                        Дэлгэрэнгүй үзэх
                      </Button>
                    )}
                    {interview.status === 'pending' && (
                      <Button variant="outline" size="sm" className="w-full" disabled>
                        Хүлээгдэж байна...
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}