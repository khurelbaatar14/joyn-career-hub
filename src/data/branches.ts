export type Branch = {
  id: string;
  name: string;
  address: string;
  coords: [number, number]; // [lng, lat]
};

export const branches: Branch[] = [
  {
    id: "ub-center",
    name: "Төв оффис",
    address: "Сүхбаатар дүүрэг, Улаанбаатар",
    coords: [106.9177, 47.9185],
  },
  {
    id: "ub-west",
    name: "Багшийн дээд салбар",
    address: "УБ, Багшийн дээд",
    coords: [106.905, 47.914],
  },
  {
    id: "ub-east",
    name: "Зайсан салбар",
    address: "УБ, Зайсан",
    coords: [106.945, 47.887],
  },
];
