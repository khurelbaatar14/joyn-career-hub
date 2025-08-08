import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ListChecks } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Jobz – Нүүр";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-2 text-2xl font-bold">Ажил хайх</h1>
        <p className="mb-6 text-muted-foreground">Байршлаар эсвэл жагсаалтаар ажлын байруудыг үзнэ үү.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="rounded-xl bg-secondary p-4">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Байршлаар хайх</h2>
                <p className="text-sm text-muted-foreground">Ойролцоох салбаруудаас шууд өргөдөл илгээ.</p>
              </div>
              <Button variant="brand" size="lg" asChild>
                <a href="/branches">Газрын зураг руу</a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="rounded-xl bg-secondary p-4">
                <ListChecks className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Жагсаалтаар хайх</h2>
                <p className="text-sm text-muted-foreground">Шүүлтүүрүүд ашиглан тохирох ажлаа ол.</p>
              </div>
              <Button variant="brand" size="lg" asChild>
                <a href="/jobs">Ажлын байр руу</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
