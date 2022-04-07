export interface ILatestCurrenciesResponse {
  date: Date;
  base: string;
  rates: { string: number }
}
