export type OAuthService = {
  name: string;
  scope: string;
  clientId: string;
  link: string;
  extraParams: string;
};

export type OAuthConfig = {
  redirectURI: string;
  services: OAuthService[];
};

export type ConfigType = {
  name: string;
  description: string;
  logoURL: string;
  faviconURL: string;
  faviconType: string;
  items_per_page: string;
};

export type AppConfig = {
  config: ConfigType;
  oauth: OAuthConfig;
};
