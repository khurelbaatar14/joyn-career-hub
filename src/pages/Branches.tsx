import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import BranchMap from "@/components/map/BranchMap";
import { branches } from "@/data/branches";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Branches() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Jobz – Салбарууд";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">Таны ойролцоох дэлгүүрүүд</h1>
        <p className="mb-4 text-muted-foreground">Салбараа сонгоод ярилцлагад орно уу.</p>
        <BranchMap />

        <div className="mt-6 grid gap-3">
          {branches.map((b) => (
            <Card key={b.id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">{b.name}</CardTitle>
                <CardDescription>{b.address}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="brand" onClick={() => navigate(`/interview?branch=${b.id}`)}>
                  Эндээс өргөдөл илгээх
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
