


export interface Token {
  accessToken: string;
}
export enum SessionStatus {
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  EXPIRED = 'EXPIRED',
  UNKNOWN = 'UNKNOWN',
}
export interface Identity {
  status: SessionStatus;
  data: {
    email: string;
    user_id: number;
    username: string;
    created_at: Date;
    role_id: number;
  } | null;
}
