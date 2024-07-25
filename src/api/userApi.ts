import axios from "axios";
import Cookies from 'js-cookie';
import { Identity, SessionStatus } from "../models/User";

export async function fetchUserProfile(): Promise<Identity> {
  const token = Cookies.get('token');
  if (!token) return { status: SessionStatus.UNAUTHENTICATED, data: null };
  const response = await fetch('http://127.0.0.1:3000/user/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    return { status: SessionStatus.EXPIRED, data: null }
  };

  return { status: SessionStatus.AUTHENTICATED, data: await response.json() };
};
