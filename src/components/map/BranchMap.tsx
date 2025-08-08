import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { branches } from "@/data/branches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function BranchMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem("MAPBOX_TOKEN") || "");
  const [temp, setTemp] = useState(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainer.current || !token) return;
    if (mapRef.current) return; // already init

    mapboxgl.accessToken = token;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [106.9177, 47.9185],
      zoom: 11,
      pitch: 0,
      projection: { name: "mercator" },
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    branches.forEach((b) => {
      const el = document.createElement("div");
      el.className = "rounded-full bg-primary shadow-md";
      el.style.width = "18px";
      el.style.height = "18px";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";
      el.title = `${b.name}`;
      el.onclick = () => navigate(`/interview?branch=${b.id}`);
      new mapboxgl.Marker(el).setLngLat(b.coords).addTo(mapRef.current!);
    });

    return () => mapRef.current?.remove();
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Mapbox public token шаардлагатай. Түр хадгалах зорилгоор энд оруулна уу.
        </p>
        <div className="flex items-center gap-2">
          <Input value={temp} onChange={(e) => setTemp(e.target.value)} placeholder="pk.•••" />
          <Button
            variant="brand"
            onClick={() => {
              setToken(temp);
              localStorage.setItem("MAPBOX_TOKEN", temp);
            }}
          >
            Хадгалах
          </Button>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="h-[320px] w-full rounded-xl border" />;
}
