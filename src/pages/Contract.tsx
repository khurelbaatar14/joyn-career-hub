import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contract() {
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { document.title = "Jobz – Гэрээ" }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">Дижитал гэрээ</h1>
        <Card>
          <CardHeader>
            <CardTitle>Ажилд авах гэрээ</CardTitle>
            <CardDescription>Дараах нөхцөлийг зөвшөөрч гарын үсгээ зурна уу.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Энэ бол демо гэрээ. Ажлын байр, хөлс, дүрэм журам гэх мэт үндсэн заалтууд багтсан.</p>
            <Input placeholder="Овог нэр (гарын үсэг)" value={name} onChange={(e)=>setName(e.target.value)} />
            <div className="flex items-center gap-2">
              <Checkbox id="agree" checked={agree} onCheckedChange={(v)=>setAgree(!!v)} />
              <label htmlFor="agree" className="text-sm">Би нөхцөлийг зөвшөөрч байна</label>
            </div>
            <Button disabled={!name || !agree} variant="brand" onClick={()=>navigate("/interviews")}>Гэрээг батлах</Button>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
}