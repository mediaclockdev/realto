import { Endpoints } from "./Endpoints";
import axiosClient from "./axiosClient";
import { ApiResult } from "./auth";

type SettingsPanel = "agent" | "user";

// Change account password for the selected panel.
export async function changePassword(
  body: Record<string, unknown>,
  panel: SettingsPanel = "agent",
): Promise<ApiResult<unknown>> {
  try {
    const response = await axiosClient.post<ApiResult<unknown>>(
      panel === "user"
        ? Endpoints.usersettingpassword.post
        : Endpoints.agentsettingpassword.post,
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
export async function updateNotificationSettings(
  body: Record<string, unknown>,
  panel: SettingsPanel = "agent",
): Promise<ApiResult<unknown>> {
  try {
    const response = await axiosClient.post<ApiResult<unknown>>(
      panel === "user"
        ? Endpoints.usersettingnotification.post
        : Endpoints.agentsettingnotification.post,
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
