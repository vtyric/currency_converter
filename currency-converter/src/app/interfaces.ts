export interface Environment {
  production: boolean;
}

export interface LatestCurrenciesResponse {
  date: Date;
  base: string;
  rates: { string: number }
}

export interface GetConvertersGeoDataResponse {
  bs_company_statement: string,
  business_name: string,
  buzzword: string,
  catch_phrase: string,
  duns_number: string,
  full_address: string,
  id: number,
  industry: string,
  latitude: number,
  logo: string,
  longitude: number,
  phone_number: string,
  suffix: string,
  type: string,
  uid: string
}

export interface Converter {
  title: string,
  description: string,
  id: number,
  latitude: number,
  longitude: number
}
