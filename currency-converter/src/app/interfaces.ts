export interface Environment {
  currencyFreaksApiKEy: string;
  production: boolean;
}

export interface LatestCurrenciesResponse {
  date: Date;
  base: string;
  rates: { string: number }
}
