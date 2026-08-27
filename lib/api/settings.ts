import { Endpoints } from "./Endpoints";
import axiosClient from "./axiosClient";
import { ApiResult } from "./auth";

// Change Agent Password
export async function changePassword(body: Record<string, unknown>): Promise<ApiResult<unknown>> {
  try {
    const response = await axiosClient.post<ApiResult<unknown>>(
      Endpoints.agentsettingpassword.post,
      body
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
}

// Update Notification Preferences (Email/SMS)
export async function updateNotificationSettings(body: Record<string, unknown>): Promise<ApiResult<unknown>> {
  try {
    const response = await axiosClient.post<ApiResult<unknown>>(
      Endpoints.agentsettingnotification.post,
      body
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
}
