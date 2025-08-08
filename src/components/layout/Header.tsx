import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden />
          </div>
          <span className="text-sm font-semibold tracking-tight">Jobz for Toki</span>
        </Link>
        <span className="text-xs text-muted-foreground">Demo</span>
      </div>
    </header>
  );
}
