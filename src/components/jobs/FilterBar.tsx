import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Filters = {
  q: string;
  type: "all" | "urgent" | "remote";
};

export default function FilterBar({ value, onChange }: { value: Filters; onChange: (v: Filters) => void }) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row">
      <Input
        value={value.q}
        onChange={(e) => onChange({ ...value, q: e.target.value })}
        placeholder="Ажлын байр хайх"
      />
      <Select value={value.type} onValueChange={(v: Filters["type"]) => onChange({ ...value, type: v })}>
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="Шүүлтүүр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Бүгд</SelectItem>
          <SelectItem value="urgent">Яаралтай</SelectItem>
          <SelectItem value="remote">Remote</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
