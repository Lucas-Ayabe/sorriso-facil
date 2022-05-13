export interface Column<A extends string | number | symbol = string> {
  acessor: A;
  label: string;
  format(item: unknown): string;
}
