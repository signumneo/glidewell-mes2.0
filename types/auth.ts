export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'supervisor' | 'viewer';
  name: string;
  authMethod?: 'azure' | 'cognito' | 'basic';
  profileImage?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export type AuthMethod = 'azure' | 'cognito' | 'basic';

export interface AuthConfig {
  method: AuthMethod;
  enabled: boolean;
}
