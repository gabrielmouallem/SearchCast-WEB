"use server";
import { AutoSuggestService, createClient } from "@/services/server";
import { TSuggestions } from "@/types";
import { getUser } from "./getUser";

export async function getAutoSuggestions(text: string) {
  const supabase = createClient();
  const user = await getUser();
  supabase.auth.getUser();
  if (!user) throw Error(`Error while getting autosuggestion: user not found`);
  return AutoSuggestService.get<TSuggestions>(`/v7.0/Suggestions`, {
    params: { q: text, mkt: "pt-BR" },
  });
}
