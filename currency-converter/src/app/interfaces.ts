export interface Environment {
  production: boolean;
}

export interface LatestCurrenciesResponse {
  date: Date;
  base: string;
  rates: { string: number }
}
