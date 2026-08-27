// lib/api/auth.ts
import { Endpoints } from "./Endpoints";
import axiosClient from "./axiosClient";

export type Agent = {
  id?: number | string;
  name?: string;
  email?: string;
  role?: string;
  is_approved?: boolean | number;
  phone?: string;
  address?: string | null;
  bio?: string | null;
  company_address?: string | null;
  company_name?: string | null;
  country_code?: string;
  created_at?: string;
  email_notifications?: number;
  is_activated?: number;
  languages?: string | null;
  license_no?: string | null;
  member_since?: string | null;
  sms_notifications?: number;
  social_links?: string | null;
  status?: string;
  title?: string | null;
  total_experience?: number | string | null;
  updated_at?: string;
  website?: string | null;
  image?: string | null;
};

export type ApiResult<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

type Body = Record<string, unknown>;

// Wrapper using our new Axios client
async function post<T>(path: string, body: Body): Promise<ApiResult<T>> {
  try {
    const response = await axiosClient.post<ApiResult<T>>(path, body);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
}

export const login = (body: Body) =>
  post<{ agent: Agent }>(Endpoints.auth.login, body);

export const signup = (body: Body) =>
  post<{ agent: Agent }>(Endpoints.auth.signup, body);
