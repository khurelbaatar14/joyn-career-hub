export type Job = {
  id: string;
  title: string;
  company: string;
  salary: string;
  posted: string;
  tags: string[];
  urgent?: boolean;
  remote?: boolean;
  branchId: string;
};

export const jobs: Job[] = [
  {
    id: "analyst-1",
    title: "Санхүүгийн шинжээч",
    company: "ТЭСО Групп",
    salary: "₮ 4,000,000",
    posted: "1 сарын өмнө",
    tags: ["Бүтэн цаг", "Эхлэх яаралтай"],
    urgent: true,
    branchId: "ub-center",
  },
  {
    id: "admin-1",
    title: "Захиргааны менежер",
    company: '"Газар Шим" ХХК',
    salary: "₮ 2,500,000",
    posted: "1 сарын өмнө",
    tags: ["Офис", "Өдөр"],
    branchId: "ub-west",
  },
  {
    id: "talent-1",
    title: "Талент хөгжил хариуцсан м...",
    company: "MCS International HR",
    salary: "Тохиролцоно",
    posted: "1 сарын өмнө",
    tags: ["Дадлагатай", "Remote"],
    remote: true,
    branchId: "ub-east",
  },
];
