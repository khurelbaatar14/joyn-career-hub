import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import FilterBar, { Filters } from "@/components/jobs/FilterBar";
import JobCard from "@/components/jobs/JobCard";
import { jobs } from "@/data/jobs";
import { useEffect, useMemo, useState } from "react";

export default function Jobs() {
  const [filters, setFilters] = useState<Filters>({ q: "", type: "all" });
  useEffect(() => {
    document.title = "Jobz – Ажлын байр";
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchQ = (j.title + j.company).toLowerCase().includes(filters.q.toLowerCase());
      const matchType =
        filters.type === "all" ||
        (filters.type === "urgent" && j.urgent) ||
        (filters.type === "remote" && j.remote);
      return matchQ && matchType;
    });
  }, [filters]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filtered.map((j, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "JobPosting",
        title: j.title,
        hiringOrganization: { "@type": "Organization", name: j.company },
        employmentType: "FULL_TIME",
        datePosted: "2025-01-01",
        jobLocationType: j.remote ? "TELECOMMUTE" : "ON_SITE",
        baseSalary: { "@type": "MonetaryAmount", currency: "MNT", value: j.salary },
      },
    })),
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <h1 className="mb-3 text-2xl font-bold">Ажлын зарууд</h1>
        <FilterBar value={filters} onChange={setFilters} />
        <div className="mt-4 grid gap-3">
          {filtered.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </main>
      <BottomNav />
    </div>
  );
}
