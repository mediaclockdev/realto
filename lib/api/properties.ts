import { Endpoints } from "./Endpoints";
import axiosClient from "./axiosClient";
import { ApiResult } from "./auth";

export type Property = {
  id: number | string;
  agent_id?: number;
  purpose?: string;
  type?: string;
  category?: string;
  title?: string;
  bedrooms?: number;
  bathrooms?: number;
  car_spaces?: number;
  location?: string;
  area_sqft?: string;
  inspection_date?: string;
  inspection_time?: string;
  price_range?: string;
  description?: string;
  views?: number;
  is_auction?: boolean;
  photos?: string[];
  amenities?: { id: number; name?: string }[];
  agent?: {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    country_code?: string;
    company_name?: string;
    image?: string | null;
  };
};

export type PropertyStats = {
  total_properties?: number;
  for_sale?: number;
  for_rent?: number;
  for_investment?: number;
};

const call = async <T>(req: () => Promise<{ data: ApiResult<T> }>) => {
  try {
    return (await req()).data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An unexpected error occurred.",
    } as ApiResult<T>;
  }
};

export const createProperty = (form: FormData) =>
  call<Property>(() =>
    axiosClient.post(Endpoints.properties.create, form, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  );

export const updateProperty = (id: number | string, form: FormData) =>
  call<Property>(() =>
    axiosClient.put(
      Endpoints.properties.update.replace(":id", String(id)),
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    ),
  );

export const deleteProperty = (id: number | string) =>
  call<null>(() =>
    axiosClient.delete(Endpoints.properties.delete.replace(":id", String(id))),
  );

export const listProperties = (params?: Record<string, string | number>) =>
  call<Property[]>(() =>
    axiosClient.get(Endpoints.properties.list, { params }),
  );

export const getPropertyStats = () =>
  call<PropertyStats>(() => axiosClient.get(Endpoints.properties.statistics));

/** Photos come back as server-relative paths like `/uploads/x.jpg`. */
export const photoUrl = (path: string) =>
  path.startsWith("http")
    ? path
    : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}${path}`;
