import { Endpoints } from "./Endpoints";
import { isAxiosError } from "axios";
import axiosClient from "./axiosClient";
import { ApiResult } from "./auth";

export type ApiCategory = {
  id: number | string;
  name: string;
  [field: string]: unknown;
  description?: string | null;
  status?: string;
  // ponytail: response shape not confirmed with backend, so accept the likely image fields
  image?: string | string[] | null;
  images?: string[] | null;
};

// API may return relative paths; make them absolute against the API host
const API = process.env.NEXT_PUBLIC_API_URL ?? "";
export const categoryImages = (c: ApiCategory) =>
  [c.images ?? c.image ?? []]
    .flat()
    .filter((s): s is string => !!s)
    .map((s) => (/^(https?:|data:|\/\/)/.test(s) ? s : `${API}/${s.replace(/^\//, "")}`));

const fail = (error: unknown) => ({
  success: false,
  message: (isAxiosError(error) && error.response?.data?.message) || "An unexpected error occurred.",
});

// Admin-managed lists share one CRUD shape: categories, languages, …
export type Resource = (typeof Endpoints)["categories" | "languages"];
const withId = (path: string, id: number | string) => path.replace(":id", String(id));
const multipart = { headers: { "Content-Type": "multipart/form-data" } };

async function call<T>(fn: () => Promise<{ data: ApiResult<T> }>): Promise<ApiResult<T>> {
  try {
    return (await fn()).data;
  } catch (error) {
    return fail(error);
  }
}

// Each item is the raw API record; callers pick the fields they need
export async function listItems(r: Resource, search = ""): Promise<ApiResult<ApiCategory[]>> {
  try {
    const body = (await axiosClient.get(r.list, { params: search ? { search } : {} })).data;
    const d = body?.data ?? body;
    const list = Array.isArray(d) ? d : d?.data ?? d?.categories ?? d?.languages ?? [];
    return { success: body?.success ?? true, data: list };
  } catch (error) {
    return fail(error);
  }
}

// form-data, same fields as the backend's create request; update accepts any subset
export const createItem = (r: Resource, form: FormData) =>
  call(() => axiosClient.post(r.create, form, multipart));
// Plain fields go as JSON (backends often don't parse multipart on PUT); FormData only when uploading files
export const updateItem = (r: Resource, id: number | string, body: FormData | Record<string, string>) =>
  call(() => axiosClient.put(withId(r.update, id), body, body instanceof FormData ? multipart : undefined));
export const deleteItem = (r: Resource, id: number | string) =>
  call(() => axiosClient.delete(withId(r.delete, id)));

// Downloads the CSV the backend builds
export async function exportItems(r: Resource, filename: string): Promise<ApiResult<never>> {
  try {
    const res = await axiosClient.get(r.export, { responseType: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(res.data);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    return { success: true };
  } catch (error) {
    return fail(error);
  }
}

export const listCategories = (search = "") => listItems(Endpoints.categories, search);
