"use server";
import { PythonApiService } from "@/services/server";

export async function checkUserAuth() {
  const { data } = await PythonApiService.get("/v1/refresh");
  return data?.access_token ? data : false;
}
