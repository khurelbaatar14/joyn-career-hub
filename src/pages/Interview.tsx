import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Interview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const branch = searchParams.get('branch');
  const position = searchParams.get('position');

  useEffect(() => {
    document.title = "Jobz – Ярилцлага";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">AI Ярилцлага</h1>
        <p className="mb-6 text-muted-foreground">Зохиомол оюун ухаантай ярилцлага өгнө үү.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>Ярилцлага эхлэх</CardTitle>
            <CardDescription>
              {branch && position 
                ? `Салбар: ${branch}, Ажлын байр: ${position}`
                : 'Ярилцлагад бэлэн үү?'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Энэ бол демо ярилцлага. Бодит ярилцлагын үед AI танд асуулт асуух болно.
            </p>
            <div className="flex gap-2">
              <Button variant="brand" onClick={() => navigate("/cv")}>
                Ярилцлага эхлэх
              </Button>
              <Button variant="outline" onClick={() => navigate("/branches")}>
                Буцах
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
}