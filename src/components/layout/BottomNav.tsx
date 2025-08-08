import { MapPin, ListChecks, MessageSquare, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Нүүр", Icon: Home },
  { to: "/branches", label: "Салбарууд", Icon: MapPin },
  { to: "/jobs", label: "Ажлын байр", Icon: ListChecks },
  { to: "/interviews", label: "Ярилцлагууд", Icon: MessageSquare },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Primary" className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ul className="mx-auto grid max-w-md grid-cols-4 gap-1 px-4 py-2">
        {tabs.map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl py-2 text-xs transition-colors",
                  active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="mb-1 h-5 w-5" aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}