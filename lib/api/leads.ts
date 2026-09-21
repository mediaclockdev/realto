import { Endpoints } from "./Endpoints";
import axiosClient from "./axiosClient";
import { call } from "./properties";

export type Lead = {
  id: number | string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  engagement?: string;
  message?: string;
  property_id?: number;
  created_at?: string;
  updated_at?: string;
};

export type NewLead = {
  name: string;
  email: string;
  phone: string;
  status: string;
  message: string;
  property_id: number;
  agent_id: number;
};

export const createLead = (body: NewLead) =>
  call<Lead>(() =>
    axiosClient.post(Endpoints.agentleadManagement.createLead, body),
  );

export const updateLead = (id: number | string, body: NewLead) =>
  call<Lead>(() =>
    axiosClient.put(
      Endpoints.agentleadManagement.updateInquire.replace(":id", String(id)),
      body,
    ),
  );

export const deleteLead = (id: number | string) =>
  call<null>(() =>
    axiosClient.delete(
      Endpoints.agentleadManagement.deleteLead.replace(":id", String(id)),
    ),
  );

export const bulkDeleteLeads = (ids: (number | string)[]) =>
  call<null>(() =>
    axiosClient.delete(Endpoints.agentleadManagement.bulkDelete, {
      data: { ids },
    }),
  );

export const listLeads = (params?: Record<string, string | number>) =>
  call<Lead[]>(() =>
    axiosClient.get(Endpoints.agentleadManagement.inquryListing, { params }),
  );
