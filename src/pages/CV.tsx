import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CV() {
  const [name, setName] = useState("Нэр Овог");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Jobz – CV";
    setSummary(sessionStorage.getItem("jobz_summary") || "");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">CV урьдчилсан хувилбар</h1>
        <Card>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>Залуу ажил горилогч</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium">Товч танилцуулга</p>
              <p className="text-muted-foreground">{summary || "Ярилцлагын мэдээллээс автоматаар бөглөнө."}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder="Имэйл" />
            </div>
            <Button variant="brand" onClick={() => navigate("/schedule")}>Уулзалтын цаг товлох</Button>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
}
