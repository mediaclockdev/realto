import { Endpoints } from "./Endpoints";
import axiosClient from "./axiosClient";
import { ApiResult } from "./auth";

export type DocumentFolder = {
  id: number | string;
  name: string;
  files_count?: number;
};

export type AgentDocument = {
  id: number | string;
  name?: string;
  original_name?: string;
  folder_id?: number | string | null;
  folder_name?: string | null;
  type?: string;
  extension?: string;
  size?: number | string;
  created_at?: string;
};

export type DocumentStats = {
  total_documents?: number;
  folders?: number;
  uploaded_this_month?: number;
  total_downloads?: number;
};

export type Paginated<T> = {
  data?: T[];
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
};

const E = Endpoints.agentdocuments;
const withId = (path: string, id: number | string) =>
  path.replace(":id", String(id));

async function call<T>(
  fn: () => Promise<{ data: ApiResult<T> }>,
): Promise<ApiResult<T>> {
  try {
    return (await fn()).data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    };
  }
}

// Stats tiles
export async function getDocumentStats(): Promise<ApiResult<DocumentStats>> {
  const res = await call<any>(() => axiosClient.get(E.stats));
  return { ...res, data: res.data?.stats ?? res.data?.data ?? res.data };
}

// Folders — backend may return the array bare, under `data`, or under `folders`.
export async function getFolders(): Promise<ApiResult<DocumentFolder[]>> {
  const res = await call<any>(() => axiosClient.get(E.listallfolders));
  const raw = res.data;
  const list = Array.isArray(raw)
    ? raw
    : (raw?.data ?? raw?.folders ?? raw?.data?.data ?? []);
  return { ...res, data: Array.isArray(list) ? list : [] };
}

export const createFolder = (body: Record<string, unknown>) =>
  call<DocumentFolder>(() => axiosClient.post(E.newfolder, body));

export const updateFolder = (
  id: number | string,
  body: Record<string, unknown>,
) => call<DocumentFolder>(() => axiosClient.put(withId(E.updatefolder, id), body));

export const deleteFolder = (id: number | string, deleteFiles = false) =>
  call<unknown>(() =>
    axiosClient.delete(
      withId(E.deletefolder, id).replace(
        "delete_files=false",
        `delete_files=${deleteFiles}`,
      ),
    ),
  );

// Documents — normalized to a Paginated shape whatever the backend nests it in.
export async function getDocuments(
  params: Record<string, unknown> = {},
): Promise<ApiResult<Paginated<AgentDocument>>> {
  const res = await call<any>(() =>
    axiosClient.get(E.listalldocuments, { params }),
  );
  const raw = res.data;
  const page = Array.isArray(raw)
    ? { data: raw }
    : (raw?.documents ?? raw?.data?.data ? (raw.documents ?? raw.data) : raw);
  const list = Array.isArray(page) ? page : (page?.data ?? []);
  return {
    ...res,
    data: {
      data: Array.isArray(list) ? list : [],
      total: page?.total ?? raw?.total ?? (Array.isArray(list) ? list.length : 0),
    },
  };
}

export const uploadDocument = (file: File, folderId?: number | string) => {
  const form = new FormData();
  form.append("file", file);
  if (folderId != null) form.append("folder_id", String(folderId));
  return call<AgentDocument>(() =>
    axiosClient.post(E.uploaddocuments, form, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );
};

export const updateDocument = (
  id: number | string,
  body: Record<string, unknown>,
) => call<AgentDocument>(() => axiosClient.put(withId(E.updatedocuments, id), body));

export const deleteDocument = (id: number | string) =>
  call<unknown>(() => axiosClient.delete(withId(E.deletedocuments, id)));

// View / download return the file itself — fetch as a blob and hand back an object URL.
async function fileUrl(path: string): Promise<string | null> {
  try {
    const res = await axiosClient.get(path, { responseType: "blob" });
    return URL.createObjectURL(res.data as Blob);
  } catch {
    return null;
  }
}

export const viewDocument = (id: number | string) =>
  fileUrl(withId(E.viewdocuments, id));

export const downloadDocument = (id: number | string) =>
  fileUrl(withId(E.downloaddocuments, id));
