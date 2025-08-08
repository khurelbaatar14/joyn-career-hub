import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const initialTasks = [
  { id: "meet", title: "Багтай танилцах", done: false },
  { id: "photo", title: "Ажилдаа ирсэн гэрэл зураг", done: false },
  { id: "quiz", title: "Аюулгүй ажиллагааны богино тест", done: false },
];

export default function Onboarding() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("jobz_tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const progress = Math.round((tasks.filter((t:any)=>t.done).length / tasks.length) * 100);

  useEffect(() => {
    document.title = "Jobz – Онбординг";
    localStorage.setItem("jobz_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggle = (id: string) => setTasks((ts:any)=>ts.map((t:any)=>t.id===id?{...t,done:!t.done}:t));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">Онбординг аялал</h1>
        <div className="mb-4">
          <Progress value={progress} />
          <p className="mt-2 text-sm text-muted-foreground">Дууссан: {progress}%</p>
        </div>
        <div className="grid gap-3">
          {tasks.map((t:any)=> (
            <Card key={t.id}>
              <CardHeader>
                <CardTitle className={t.done?"line-through text-muted-foreground":""}>{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant={t.done?"secondary":"brand"} onClick={()=>toggle(t.id)}>
                  {t.done?"Дууссан":"Дуусгах"}
                </Button>
                {t.id==="photo" && <Button variant="secondary">Зураг байрлуулах</Button>}
                {t.id==="quiz" && <Button variant="secondary">Тест өгөх</Button>}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
