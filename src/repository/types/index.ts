export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type Module = {
  "id": number;
  "module": string;
  "status": string; // bool
  "kyc": string; // bool
  "created_at": Date |null;
  "updated_at": Date;
}