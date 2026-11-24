import { createClient } from "@supabase/supabase-js";

export const ANNE_SUPABASE_URL = "https://mezafzsrxzgryefprblh.supabase.co";
export const ANNE_SUPABASE_KEY = "sb_publishable_TDk-7FqEPphaWB30qkjMGw_BvHMr1vu";
export const ANNE_BUCKET_IMAGENS = "projetos-imagens";

export const anneDb = createClient(ANNE_SUPABASE_URL, ANNE_SUPABASE_KEY, {
  auth: {
    persistSession: typeof window !== "undefined",
    autoRefreshToken: typeof window !== "undefined",
  },
});

export function urlImagemProjeto(caminho?: string | null): string {
  if (!caminho) return "";
  return anneDb.storage.from(ANNE_BUCKET_IMAGENS).getPublicUrl(caminho).data.publicUrl;
}