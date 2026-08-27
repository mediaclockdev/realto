import { Endpoints } from "./Endpoints";
import axiosClient from "./axiosClient";
import { Agent, ApiResult } from "./auth";

export type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

async function get<T>(path: string): Promise<ApiResult<T>> {
  try {
    const response = await axiosClient.get<ApiResult<T>>(path);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
}

// Generic PUT helper
async function put<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<ApiResult<T>> {
  try {
    const response = await axiosClient.put<ApiResult<T>>(path, body);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
}

// Fetch Agent Profile
export const getAgentProfile = () => {
  return get<Agent>(Endpoints.agentprofile.get);
};

// Update Agent Profile
export const updateAgentProfile = (body: Record<string, unknown>) => {
  return put<Agent>(Endpoints.agentprofile.update, body);
};

// Fetch User Profile
// export const getUserProfile = () => {
//   return get<User>(Endpoints.userprofile.get);
// };

// Update User Profile
// export const updateUserProfile = (body: Record<string, unknown>) => {
//   return put<User>(Endpoints.userprofile.update, body);
// };
