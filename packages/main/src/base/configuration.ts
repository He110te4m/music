export interface ConfigurationBase {
  set(key: string, value: unknown): boolean;
  get(key: string): unknown;
  del(key: string): boolean;
  has(key: string): boolean;
  len(): number;
}
