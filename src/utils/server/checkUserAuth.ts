"use server";
import { api } from "@/services/server";

export async function checkUserAuth() {
  const { data } = await api.get("/v1/refresh");
  return data?.access_token ? data : false;
}
