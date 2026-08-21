export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  success: boolean;
  message: string;
  code?: 'accepted' | 'invalid' | 'rate_limited' | 'unavailable';
}
