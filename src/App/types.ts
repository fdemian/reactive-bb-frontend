export interface OAuthService {
  name: string;
  scope: string;
  clientId: string;
  link: string;
  extraParams: string;
}

export interface OAuthConfig {
  redirectURI: string;
  services: OAuthService[];
}

export interface ConfigType {
  name: string;
  description: string;
  logoURL: string;
  faviconURL: string;
  faviconType: string;
  items_per_page: string;
}

export interface AppConfig {
  config: ConfigType;
  oauth: OAuthConfig;
}
