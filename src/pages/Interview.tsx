import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Message { id: string; role: "ai" | "user"; text?: string; audioUrl?: string }

export default function Interview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    document.title = "Jobz – AI ярилцлага";
    setMessages([
      { id: "m1", role: "ai", text: "Сайн байна уу! Танилцуулга хийе. Өөрийнхөө тухай 30 секунд ярьна уу." },
    ]);
  }, []);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    mediaRef.current = mr;
    chunks.current = [];
    mr.ondataavailable = (e) => chunks.current.push(e.data);
    mr.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      const id = Math.random().toString(36).slice(2);
      setMessages((m) => [...m, { id, role: "user", audioUrl: url }]);
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: id + "a", role: "ai", text: "Баярлалаа. Сүүлд хийсэн ажлынхаа тухай богино танилцуулна уу." },
        ]);
      }, 800);
    };
    mr.start();
    setRecording(true);
  };

  const stop = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  const summarize = () => {
    const summary = "AI ярилцлагын үр дүн: идэвхтэй, харилцааны ур чадвартай, үйлчилгээний чиглэлээр тохиромжтой.";
    sessionStorage.setItem("jobz_summary", summary);
    toast({ title: "CV үүсгэхэд бэлэн", description: "Дараах алхам руу шилжиж байна." });
    navigate("/cv" + (search || ""));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">AI ярилцлага</h1>
        <div className="space-y-3">
          {messages.map((m) => (
            <Card key={m.id} className={m.role === "ai" ? "border-primary/30" : ""}>
              <CardHeader>
                <CardTitle className="text-base">{m.role === "ai" ? "Jobz AI" : "Та"}</CardTitle>
              </CardHeader>
              <CardContent>
                {m.text && <p>{m.text}</p>}
                {m.audioUrl && (
                  <audio className="w-full" controls src={m.audioUrl} />
                )}
              </CardContent>
            </Card>
          ))}

          <div className="flex items-center gap-3">
            {!recording ? (
              <Button variant="brand" onClick={start}>Дуу хоолой бичих</Button>
            ) : (
              <Button variant="destructive" onClick={stop}>Дуусгах</Button>
            )}
            <Button variant="secondary" onClick={summarize}>CV үүсгэх</Button>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
