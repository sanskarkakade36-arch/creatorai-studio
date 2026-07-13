import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, BrandProfile } from "@/types/database";

export async function getBrandProfile(
  supabase: SupabaseClient<Database>,
  orgId: string,
): Promise<BrandProfile | null> {
  const { data } = await supabase.from("brand_profiles").select("*").eq("org_id", orgId).maybeSingle();
  return data;
}

export async function saveBrandProfile(
  supabase: SupabaseClient<Database>,
  orgId: string,
  data: Omit<Database["public"]["Tables"]["brand_profiles"]["Insert"], "org_id">,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("brand_profiles")
    .upsert({ org_id: orgId, ...data }, { onConflict: "org_id" });

  return { error: error?.message ?? null };
}
