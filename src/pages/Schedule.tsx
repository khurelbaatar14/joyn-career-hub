import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [time, setTime] = useState<string>("10:00");
  const navigate = useNavigate();
  useEffect(() => { document.title = "Jobz – Цаг товлох" }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">Уулзалтын цаг товлох</h1>
        <Card>
          <CardHeader>
            <CardTitle>HR-тай уулзах</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="grid grid-cols-3 gap-2">
              {["10:00","11:00","14:00","15:00","16:00","17:00"].map((t) => (
                <Button key={t} variant={time===t?"brand":"secondary"} onClick={() => setTime(t)}>
                  {t}
                </Button>
              ))}
            </div>
            <Button variant="brand" onClick={() => navigate("/contract")}>Баталгаажуулах</Button>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
}
